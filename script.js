$(document).ready(initializeApp);

function initializeApp() {
    display = new Display();
    display.init();
    initMap();
}

function Display() {
    this.foodArray = ['./images/pizza.svg', './images/noodles.svg', './images/taco.svg','./images/sushi.svg','./images/Burger.svg','./images/Coffee.svg','./images/Beer.svg'];


    this.init = function () {
        this.display();
    };

    this.display = function () {
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

        var trailerButton = $("<button>", {
            type: "button",
            class: "btn btn-info btn-lg",
            text: "Show Movie Trailer",
            'data-target': 'trailerModal',
            'data-toggle': "modal",
            on: {
                click: function () {
                    $('#trailerModal').modal('show');
                }
            }
        });

        movieInfo.append(trailerButton);

        var displayMap = $('<div>', {
            class: 'displayMap',
            id: 'map'
        });
        container.append(displayMap);

        var foodInfo = $('<div>', {
            class: 'foodInfo'
        });
        container.append(foodInfo);

        var title = $('<div>', {
            class: 'footer'
        });
        container.append(title);
    }
}


var map;
var infowindow;

//needs to call function initMap because

function initMap() {


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude


            };
            console.log(pos)

            var current = {lat: pos.lat, lng: pos.lng};
            // var current = navigator.geolocation;

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: current
            });
            var marker = new google.maps.Marker({
                position: current,
                map: map
            });

            // var infoWindow = new google.maps.InfoWindow;
            //
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


}


// var map;
// var infowindow;

//needs to call function initMap because
//
// function initMap() {
//     var current = {lat: 33.6441211395679, lng: -117.743128531307};
//
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: current,
//         zoom: 17
//     });
//
//     var infowindow = new google.maps.InfoWindow();
//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({
//         location: current,
//         radius: 500,
//         type: ['bank']
//     }, callback);
// }
//
//
// function callback(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }
//     }
// }
//
// function createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });
//
//     //how to add information to marker
//
//     google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent(place.name);
//         infowindow.open(map, this);
//     });
//
//
// }
//

function Movie() {

    this.movieDataFrontPage = function () {
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
            success: function (result) {
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
                        currentMovie.on('mouseover', function () {
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
            error: function (result) {
                console.log(result)
            }
        };
        $.ajax(ajaxConfig);
    };

    this.cinemaDataSearch = function (location) {
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
            success: function (result) {
                if (!result) {
                    console.log("Something went wrong");
                }
                else {
                    console.log(result);
                    var cinemaLocations = [];
                    for (var i = 0; i < result.cinemas.length; i++) {
                        let cinema = {lat:result.cinemas[i].location.lat, lng:result.cinemas[i].location.lon};
                        console.log(cinema);
                        cinemaLocations.push(cinema);
                    }
                    return result;
                }
            },
            error: function (result) {
                console.log(result)
            }
        };
        $.ajax(ajaxConfig);
    };
}

var movies = new Movie();

function GetYelpData() {
    this.yelpData = function (long, lat) {
        $.ajax({
            url: "http://danielpaschal.com/yelpproxy.php",
            method: "GET",
            dataType: "JSON",
            data: {
                api_key: "dYgZH0Ww1s8M1O3ERoy1zlO76NJdF5SCsCvZ7JcK2E7-9JQ2n2GFVQdNweumwfphSpCOKCB-GdhKe0kdNeepo7J91qE78gAJzDidYLCMGWEKaq6TK6kBS_Z2JvNcWnYx",
                term: "mexican restaurant",
                latitude: 33.6441211395679,
                longitude: -117.743128531307,
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
    this.getData = function (data) {
        for (let dataIndex = 0; dataIndex < data.businesses.length; dataIndex++) {
            console.log(data.businesses[dataIndex].categories);
        }
    }

}

var yelp = new GetYelpData();
yelp.yelpData();

movies.cinemaDataSearch();