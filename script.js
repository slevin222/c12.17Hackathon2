$(document).ready(initializeApp);

function initializeApp() {
    display = new Display();
    display.init();
    initMap();
}

function Display() {
    this.foodArray = ['./images/Pizza.svg', './images/Noodles.svg', './images/Taco.svg', './images/Sushi.svg', './images/Burger.svg', './images/Coffee.svg', './images/Beer.svg'];


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


var markers = [];
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 33.6441211395679, lng: -117.743128531307}
    });
    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
    });
}

function drop(array) {
    clearMarkers();
    console.log(array);
    for (var i = 0; i < array.length; i++) {
        addMarkerWithTimeout(array[i], i * 200);
    }
}

function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function () {
        markers.push(new google.maps.Marker({
            position: position,
            map: map,
            icon: 'https://findicons.com/files/icons/2166/oxygen/128/applications_toys.png',
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
                        let cinema = {lat: result.cinemas[i].location.lat, lng: result.cinemas[i].location.lon};
                        console.log(cinema);
                        cinemaLocations.push(cinema);
                    }
                    console.log(cinemaLocations);
                    drop(cinemaLocations);
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