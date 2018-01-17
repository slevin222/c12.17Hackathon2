$(document).ready(initializeApp);

function initializeApp() {
	$(".btn-primary").click(changeScreen);
	$("#container").hide();
}

function changeScreen() {
	$("#introPage").fadeOut(1000);
	display = new Display();
	display.init();
	initMap();
	$("#container").fadeIn(1000);
}

function Display() {

	this.foodArray = ['./images/Pizza.svg', './images/Noodles.svg', './images/Taco.svg', './images/Sushi.svg', './images/Burger.svg', './images/Coffee.svg', './images/Beer.svg'];

	this.init = function() {
		this.display();
	};

	this.display = function() {
		container = $("#container");

		for (var i = 1; i < 11; i++) {
			var movieRow = $('<div>', {
				class: 'movie',
				id: 'movie' + i
			});
			container.append(movieRow);
		}
		movies.movieDataFrontPage();

		for (var x = 1; x < 8; x++) {
			var foodRow = $('<div>', {
				class: 'foodType' + x
			});
			foodRow.css('background-image', "url('" + this.foodArray[x - 1] + "')");
			container.append(foodRow);
		}

		var movieInfo = $('<div>', {
			class: 'movieInfo',
		});
		container.append(movieInfo);
		var movieInfoTitle = $('<div>', {
			class: 'movieInfoTitle',
		});
		movieInfo.append(movieInfoTitle);
		var movieInfoSyn = $('<div>', {
			class: 'movieInfoSyn',
		});
		movieInfo.append(movieInfoSyn);
		var movieInfoPics = $('<div>', {
			class: 'movieInfoPics',
		});

		movieInfo.append(movieInfoPics);

		var theatreButton = $("<button>", {
			type: "button",
			class: "btn btn-info btn-md",
			text: "Show Theatres",
			'data-target': 'theatreModal',
			'data-toggle': "modal",
			on: {
				click: function() {
					$('#theatreModal').modal('show');
				}
			}
		});

		movieInfo.append(theatreButton);
		var showTimes = $("<button>", {
			type: "button",
			class: "btn btn-info btn-md",
			text: "Show Movie Times",
			'data-target': 'showTimesModal',
			'data-toggle': "modal",
			on: {
				click: function() {
					$('#showTimesModal').modal('show');
				}
			}
		});
		movieInfo.append(showTimes);
		var displayMap = $('<div>', {
			class: 'displayMap',
			id: 'map'
		});
		container.append(displayMap);

		var foodInfo = $('<div>', {
			class: 'foodInfo'
		});
		container.append(foodInfo);
		var foodInput = $('<input>', {
			type: "text",
			name: "genre",
			class: "foodInput"
		});
		var locationInput = $('<input>', {
			type: "text",
			name: "zipCode",
			class: "locationInput",
			placeholder: "Input Zipcode"
		});
		var foodButton = $('<input>', {
			type: "button",
			click: function() {
				var term = $('.foodInput').val();
				var location = $('.locationInput').val();
				yelp.yelpData(term, location);
			},
			value: "Submit"
		})
		foodInfo.append(foodInput, locationInput, foodButton)
		var title = $('<div>', {
			class: 'footer'
		});
		container.append(title);
	}

}



var markers = [];
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: {
			lat: 33.6441211395679,
			lng: -117.743128531307
		}
	});
	google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event.latLng);
	});
}


// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         var pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//
//         };
//         console.log(pos)
//
//         var current = {lat: pos.lat, lng: pos.lng};
//         // var current = navigator.geolocation;
//
//         var map = new google.maps.Map(document.getElementById('map'), {
//             zoom: 13,
//             center: current
//         });
//         var marker = new google.maps.Marker({
//             position: current,
//             map: map
//         });
//
//         map.setCenter(pos);
//     }, function() {
//         handleLocationError(true, infoWindow, map.getCenter());
//     });
//
// } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
// }
//
// function createMakers(results) {
//     for (var i = 0; i < results.length; i++) {
//         var coords = results[i];
//         var latLng = new google.maps.LatLng(coords[1], coords[0]);
//         var marker = new google.maps.Marker({
//             position: latLng,
//             map: map
//         });
//     }
// }
//
//
//
// var results = [
//
//     {lat: 33.6447809695316, lng: -117.74444454841},
//     {lat: 33.6514285646533, lng: -117.746069293683},
//     {lat: 33.620624, lng: -117.699047},
//     {lat: 33.6220781, lng: -117.684251},
//     {lat: 33.62161, lng: -117.73214},
// ];
//
// createMakers(results);



function drop(array) {
	clearMarkers();
	console.log(array);
	for (var i = 0; i < array.length; i++) {
		addMarkerWithTimeout(array[i], i * 200);
	}
}

function addMarkerWithTimeout(position, timeout) {
	window.setTimeout(function() {
		markers.push(new google.maps.Marker({
			position: position,
			map: map,
			// icon: 'https://findicons.com/files/icons/2166/oxygen/128/applications_toys.png',
			animation: google.maps.Animation.DROP
		}));
	}, timeout);
}


function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

function placeMarker(location) {
	clearMarkers();
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
}


function Movie() {
	this.movieDataFrontPage = function() {
		var ajaxConfig = {
			data: {
				location: "33.6441211395679,-117.743128531307",
				limit: 10,
				countries: 'US',
				fields: 'title,poster_image.flat,scene_images.flat,synopsis,trailers'
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
					for (var movieDataIndex = 0; movieDataIndex < 10; movieDataIndex++) {
						var currentMovie = $('#movie' + (movieDataIndex + 1));
						currentMovie[0].movie = result.movies[movieDataIndex];
						currentMovie.css({
							'background-image': "url('" + currentMovie[0].movie.poster_image + "')"
						});
						currentMovie.on('mouseover', function() {
							$('.movieInfoTitle').text(this.movie.title);
							$('.movieInfoSyn').text(this.movie.synopsis);
							$('.movieInfoPics').empty();
							for (var i = 0; i < this.movie.scene_images.length && i < 3; i++) {
								$('.movieInfoPics').append($('<img>').attr('src', this.movie.scene_images[i]));
							}
							// var url = this.movie.trailers[0].trailer_files[0].url.replace("watch?v=", "embed/");
							// $('#video-modal').empty().attr('src', url);
						})
					}
				}
			},
			error: function(result) {
				console.log(result)
			}
		};
		$.ajax(ajaxConfig);
	};

	this.cinemaDataSearch = function(location) {
		var ajaxConfig = {
			data: {
				location: location,
				limit: 4,
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
					console.log(result);
					var cinemaLocations = [];
					for (var i = 0; i < result.cinemas.length; i++) {
						let cinema = {
							lat: result.cinemas[i].location.lat,
							lng: result.cinemas[i].location.lon
						};
						console.log(cinema);
						cinemaLocations.push(cinema);
					}
					console.log(cinemaLocations);
					drop(cinemaLocations);
				}
			},
			error: function(result) {
				console.log(result)
			}
		};
		$.ajax(ajaxConfig);
	};
}

var movies = new Movie();

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
		var restaurantLocation = [];
		for (let dataIndex = 0; dataIndex < data.businesses.length; dataIndex++) {
			let restaurant = {
				lat: data.businesses[dataIndex].coordinates.latitude,
				lng: data.businesses[dataIndex].coordinates.longitude
			};
			console.log("this is single" + restaurant);
			restaurantLocation.push(restaurant);
		}
		console.log("the whole" + restaurantLocation);
		drop(restaurantLocation);
	}
}
var testObj = {
	lat: 33.6441211395679,
	lng: -117.743128531307
}
var yelp = new GetYelpData();
yelp.yelpData("sushi", testObj);
movies.cinemaDataSearch(testObj);