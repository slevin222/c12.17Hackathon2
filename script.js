$(document).ready(initializeApp);

function initializeApp() {
    display = new Display();
    display.init();
    initMap();

}


function Display() {

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
            container.append(foodRow);
        }

        var movieInfo = $('<div>', {
            class: 'movieInfo',
        });
        container.append(movieInfo);
        var movieInfoTitle =  $('<div>', {
            class: 'movieInfoTitle',
        });
        movieInfo.append(movieInfoTitle);
        var movieInfoSyn =  $('<div>', {
            class: 'movieInfoSyn',
        });
        movieInfo.append(movieInfoSyn);
        var movieInfoPics =  $('<div>', {
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
    var current = {lat: 33.6441211395679, lng: -117.743128531307};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: current
    });
    var marker = new google.maps.Marker({
        position: current,
        map: map
    });

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
                            for (var i = 0; i < this.movie.scene_images.length && i < 3; i++) {
                                $('.movieInfoPics').append($('<img>').attr('src', this.movie.scene_images[i]));
                            }
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

    this.cinemaDataSearchPage = function (location) {
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
                if (result["success"]) {
                    console.log("Results: " + result);
                } else {
                    console.log(result);
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

movies.cinemaDataSearchPage();


