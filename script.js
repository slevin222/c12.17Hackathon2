$(document).ready(initializeApp);

function initializeApp() {
	$(".btn-primary").click(changeScreen);
	$("#container").hide();
}


function changeScreen() {
	// var zipCode = $(".form-control").val();
	// console.log(zipCode);
	$("#introPage").fadeOut(1000);
	display.init();
	initMap();
	$("#container").fadeIn(1000);
}

let display = {

	foodObject: [{
			name: "pizza",
			img: './images/Pizza.svg'
		},
		{
			name: "noodles",
			img: './images/Noodles.svg'
		},
		{
			name: "mexican",
			img: './images/Taco.svg'
		},
		{
			name: "sushi",
			img: './images/Sushi.svg'
		},
		{
			name: "burger",
			img: './images/Burger.svg'
		},
		{
			name: "coffee",
			img: './images/Coffee.svg'
		},
		{
			name: "beer",
			img: './images/Beer.svg'
		}
	],

	init: function() {
		this.display();
	},

	display: function() {
		container = $("#container");

		for (let i = 1; i < 11; i++) {
			let movieRow = $('<div>', {
				class: 'movie',
				id: 'movie' + i
			});
			container.append(movieRow);
		}
		movies.movieDataFrontPage();

		for (var x = 1; x < 8; x++) {
			var foodRow = $('<div>', {
				id: 'foodType' + x,
				class: 'foodType',
				number: (x - 1),
				click: getTerm,
                on:{
				    click: function(){
                        $('.foodType').css('border', 'hidden');
                        $(this).css('border', '1px white solid');
                    }
                }
			});
			foodRow.css('background-image', "url('" + this.foodObject[x - 1].img + "')");
			container.append(foodRow);
		}
		let movieInfo = $('<div>', {
			class: 'movieInfo',
		});
		container.append(movieInfo);
		var showTimes = $('<div>',{
		    'class': 'showTimes',
            css:{
		        'display': 'none'
            }
        });
        container.append(showTimes);
		for(let i = 0 ; i < 4 ; i++){
            var movieTitle = $('<div>', {'id' : 'movieTitle'+i, 'class': 'movieTitles'});
		    showTimes.append(movieTitle);
		    var showTimesDiv = $('<div>',{'id' : 'movieShowTimes'+i, 'class':'showTimesShowTimes'});
            showTimes.append(showTimesDiv);
        }
        let showTimesBtn = $('<button>', {
            type: 'button',
            class: 'btn btn-default',
            text: 'Show Movie Info',
            on: {
                'click': function(){
                    $('.showTimes').hide();
                    $('.movieInfo').show();
                }
            }
        });
        showTimes.append(showTimesBtn);
		let movieInfoTitle = $('<div>', {
			class: 'movieInfoTitle',
		});
		movieInfo.append(movieInfoTitle);
		let movieInfoSyn = $('<div>', {
			class: 'movieInfoSyn',
		});
		movieInfo.append(movieInfoSyn);
		let movieInfoPics = $('<div>', {
			class: 'movieInfoPics',
		});

		movieInfo.append(movieInfoPics);

		let showTimesButton = $("<button>", {
			type: "button",
			class: "btn btn-default",
			text: "Show Movie Times",
			id: "timesBtn",
            css: {"display" : "none", "text-align": "center"},
			on: {
				click: function() {
					$('.showTimes').show();
					$('.movieInfo').hide();
				}
			}
		});

		movieInfo.append(showTimesButton);

		let displayMap = $('<div>', {
			class: 'displayMap',
			id: 'map'
		});
		container.append(displayMap);
		let foodInfo = $('<div>', {
			class: 'foodInfo'
		});
		container.append(foodInfo);
		for (let h = 1; h < 6; h++) {
			let foodPlace = $('<div>', {
				id: "foodPlace" + h,
				class: "foodPlace"
			});
			foodInfo.append(foodPlace);
		}
		let foodInput = $('<input>', {
			type: "text",
			name: "genre",
			placeholder: "Enter food type",
			class: "foodInput"
		});

		let foodButton = $('<input>', {
			type: "button",
			class: "btn btn-info btn-md",
			click: function() {
				$('.aTag').remove();
				let term = $('.foodInput').val();
				placeMarker(currentLocation, term);
			},
			value: "Submit"
		});
		foodInfo.append(foodInput, foodButton);
	}
};

function getTerm() {
	let getThisClass = $(this).attr('number');
	$('.foodInput').val(display.foodObject[getThisClass].name);
}

var markers = [];
var map;
var currentLocation;
var infoWindow;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: {
			lat: 33.6441211395679,
			lng: -117.743128531307
		}
	});

	infoWindow = new google.maps.InfoWindow;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var current = {
				lat: pos.lat,
				lng: pos.lng
			};
			var marker = new google.maps.Marker({
				position: current,
				map: map,
			});
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}


	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?
			'Error: The Geolocation service failed.' :
			'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(map);
	}

	google.maps.event.addListener(map, 'click', function(event) {
		$('.restaurantInfo').fadeOut();
		$('.foodInfo').fadeIn();
		$('.aTag').remove();
		let term = $('.foodInput').val();
		clearMarkers();
		placeMarker(event.latLng, term);
		currentLocation = event.latLng;


	});
}

function dropCinema(array) {
	for (let i = 0; i < array.length; i++) {
		(function() {
			let marker = new google.maps.Marker({
				position: array[i],
				map: map,
				icon: './images/Cinema-Icon.png',
				animation: google.maps.Animation.DROP
			});
			markers.push(marker);
			google.maps.event.addDomListener(marker, 'click', function() {
				$('.movieInfo').append('<div>', {
					'class': 'movie-times row'
				});
				$('.movie-times').append('<div>', {
					'class': 'col-sm-8',
					'text': movies.currentCinemas[i]
				});
			});
		})(markers[i]);
	}
	$('#timesBtn').show();
}

function dropRestaurant(array) {
	for (let i = 0; i < array.length; i++) {
		(function() {
			let marker = new google.maps.Marker({
				position: array[i],
				map: map,
				icon: './images/Restaurant-Icon.png',
				animation: google.maps.Animation.DROP
			});
			markers.push(marker);
			google.maps.event.addDomListener(marker, 'click', function() {});
		})(markers[i]);
	}
}

function clearMarkers() {
	for (let i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

function placeMarker(location, foodType) {
	clearMarkers();
	markers.push(new google.maps.Marker({
		position: location,
		map: map,
		animation: google.maps.Animation.DROP
	}));
	let locString = location.lat() + "," + location.lng();
	let yelpLocation = {
		lat: location.lat(),
		lng: location.lng()
	};
	movies.cinemaDataSearch(locString);
	yelp.yelpData(foodType, yelpLocation);
}

let movies = {
	currentMovieId: "",
	currentCinemas: [],
	currentCinemasLocation: [],

	movieDataFrontPage: function() {
		let ajaxConfig = {
			data: {
				location: "33.6441211395679,-117.743128531307",
				limit: 10,
				countries: 'US',
				fields: 'title,id,poster_image.flat,scene_images.flat,synopsis,trailers'
			},
			type: 'GET',
			url: 'https://api.internationalshowtimes.com/v4/movies/',
			headers: {
				'X-API-Key': 'UITTMomjJcICW40XNigMoGaaCSykTcYd'
			},
			success: function(result) {
				if (!result) {
					console.log("We have empty results or something went wrong");
				} else {
					console.log(result);
					for (let movieDataIndex = 0; movieDataIndex < 10; movieDataIndex++) {
						let currentMovie = $('#movie' + (movieDataIndex + 1));
						currentMovie[0].movie = result.movies[movieDataIndex];
						currentMovie.css({
							'background-image': "url('" + currentMovie[0].movie.poster_image + "')"
						});
						// Creates Button
						let trailerButton = $("<button>", {
							id: '#moviebutton' + (movieDataIndex + 1),
							type: "button",
							class: "btn btn-default btn-md",
							text: "Trailer",
							'data-target': 'trailerModal',
							'data-toggle': "modal",
							on: {
								click: function() {
									$('#trailerModal').modal('show');
								}
							}
						});
						currentMovie.append(trailerButton);

						////// MOVIE TRAILER ///////
						let movieTrailer = result.movies;
						let trailer = movieTrailer[movieDataIndex].trailers[0].trailer_files[0].url;
						let str = String(trailer);
						let res = str.replace("watch?v=", "embed/");
						// Mouseover to show button
						currentMovie.on('mouseenter', function() {
							$(this).find("button").show();
						});
						currentMovie.on('mouseleave', function() {
							$(this).find("button").hide();
						});

						$('#movie' + (movieDataIndex + 1) + ' button').on('click', function() {
							$('#video').attr('src', res);
							$('#trailerModal h4').text(result.movies[movieDataIndex].title);
						});

						// Shows Movie Data on Click
						currentMovie.on('click', function() {
							$('.movieInfoTitle').text(this.movie.title);
							$('.movieInfoSyn').text(this.movie.synopsis);
							$('.movieInfoPics').empty();
							for (let i = 0; i < this.movie.scene_images.length && i < 3; i++) {
								$('.movieInfoPics').append($('<img>').attr('src', this.movie.scene_images[i]));
							}
							movies.currentMovieId = this.movie.id;
                            $('.movie').css('border', "hidden");
                            $(this).css('border', "1px solid white");
						});
					}
				}
			},
			error: function(result) {
				console.log(result)
			}
		};
		$.ajax(ajaxConfig);
	},

	cinemaDataSearch: function(location) {
		let ajaxConfig = {
			data: {
				location: location,
				limit: 4,
				distance: 10,
				movie_id: movies.currentMovieId,
				countries: 'US',
				fields: 'id,name,telephone,website,location,location.address'
			},
			type: 'GET',
			url: 'https://api.internationalshowtimes.com/v4/cinemas/',
			headers: {
				'X-API-Key': 'UITTMomjJcICW40XNigMoGaaCSykTcYd'
			},
			success: function(result) {
				if (!result) {
					console.log("Something went wrong");
				} else {
					var currentCinemasLocation = [];
					for (let i = 0; i < result.cinemas.length; i++) {
						movies.currentCinemas.push(result.cinemas[i]);
						movies.fetchShowTimes(i).then((response) => {
							result.cinemas[i].showtimes = response.showtimes;
							let cinema = {
								lat: result.cinemas[i].location.lat,
								lng: result.cinemas[i].location.lon
							};
                            $("#movieTitle"+i).text(result.cinemas[i].name);
                            $("#movieShowTimes"+i).empty();
                            for( let j = 0; j < result.cinemas[i].showtimes.length ; j ++){
                                var curShowTime = result.cinemas[i].showtimes[j].start_at;
                                curShowTime = curShowTime.split("");
                                curShowTime = curShowTime.splice(11,5);
                                curShowTime = curShowTime.join("");
                                $("#movieShowTimes"+i).append($('<span>').text(curShowTime+"   "));
                            }
							currentCinemasLocation.push(cinema);
							dropCinema(currentCinemasLocation);
						}, (err) => {
							console.log("Error in cinemaDataSearch: ", err)
						})
					}

				}
			},
			error: function(result) {
				console.log(result)
			}
		};
		$.ajax(ajaxConfig);
	},

	fetchShowTimes: function(index) {
		let deferred = $.Deferred();
		let ajaxConfig = {
			data: {
				movie_id: movies.currentMovieId,
				cinema_id: movies.currentCinemas[index].id,
				time_from: movies.setDate(),
				fields: 'start_at'
			},
			type: 'GET',
			url: 'https://api.internationalshowtimes.com/v4/showtimes/',
			headers: {
				'X-API-Key': 'UITTMomjJcICW40XNigMoGaaCSykTcYd'
			},
			success: deferred.resolve,
			error: deferred.reject
		};
		$.ajax(ajaxConfig);
		return deferred;
	},

	setDate: function() {
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		if (month.toString().length == 1) {
			var month = '0' + month;
		}
		if (day.toString().length == 1) {
			var day = '0' + day;
		}
		if (hour.toString().length == 1) {
			var hour = '0' + hour;
		}
		if (minute.toString().length == 1) {
			var minute = '0' + minute;
		}
		if (second.toString().length == 1) {
			var second = '0' + second;
		}
		var fullDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + "-08:00";
		return fullDate;
	}
};

function GetYelpData() {
	this.yelpData = function(term, location) {
		$.ajax({
			url: "http://danielpaschal.com/yelpproxy.php",
			method: "GET",
			dataType: "JSON",
			data: {
				api_key: "dYgZH0Ww1s8M1O3ERoy1zlO76NJdF5SCsCvZ7JcK2E7-9JQ2n2GFVQdNweumwfphSpCOKCB-GdhKe0kdNeepo7J91qE78gAJzDidYLCMGWEKaq6TK6kBS_Z2JvNcWnYx",
				term: term,
				latitude: location.lat,
				longitude: location.lng,
				location: location,
				limit: 5,
				radius: 8046
			},
			success: (response) => {
				console.log(response);
				let dataObj = response;
				this.getData(dataObj);
			},
			error: (response) => {
				console.log(response);
			}
		})
	};
	this.getData = function(data) {
		let restaurantLocation = [];
		for (let dataIndex = 0; dataIndex < data.businesses.length; dataIndex++) {
			let restaurant = {
				lat: data.businesses[dataIndex].coordinates.latitude,
				lng: data.businesses[dataIndex].coordinates.longitude
			};
			let name = data.businesses[dataIndex].name;
			//	name = name.link(data.businesses[dataIndex].url)
			restaurantLocation.push(restaurant);
			let aTag = $("<a>", {
				"href": data.businesses[dataIndex].url,
				"target": '_blank',
				class: "aTag",
				text: name
			});
			$('#foodPlace' + (dataIndex + 1)).append(aTag);
		}
		dropRestaurant(restaurantLocation, data);
	}
}
let testObj = {
	lat: 33.6441211395679,
	lng: -117.743128531307
};
let yelp = new GetYelpData();
// yelp.yelpData("sushi", testObj.lat, testObj.lng);
// movies.cinemaDataSearch(testObj);