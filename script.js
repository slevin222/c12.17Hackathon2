$(document).ready(initializeApp);

function initializeApp() {
    display = new Display();
    display.init();
}


function Display() {
    this.init = function () {
        this.display();
    };

    this.display = function () {
        var container = $("container");
        for (var i = 1; i < 8; i++) {
            var movieRow = $('<div>', {
                class: 'movie'+i
            });
            container.append(movieRow);
        }

        for (var x = 1; x < 8; x++) {
            var foodRow = $('<div>', {
                class: 'foodType'+x
            });
            container.append(foodRow);
        }

        var movieInfo =  $('<div>', {
            class: 'movieInfo'
        });
        container.append(movieInfo);

        var displayMap =  $('<div>', {
            class: 'displayMap'
        });
        container.append(displayMap);

        var foodInfo =  $('<div>', {
            class: 'foodInfo'
        });
        container.append(foodInfo);

        var title = $('<div>', {
            class: 'footer'
        });
        container.append(title);
    }
}
 function movieDataFrontPage() {
    let ajaxConfig = {
        data: {
            location:"33.6441211395679,-117.743128531307",
            limit:10,
            countries:'US',
            fields: 'title,scene_images,synopsis,trailers'
        },
        type: 'GET',
        url: 'https://api.internationalshowtimes.com/v4/movies/',
        headers:{
            'X-API-Key': 'UITTMomjJcICW40XNigMoGaaCSykTcYd'
        },
        success: function (result) {
            if (result["success"]) {
                console.log("Results: "+ result);

                for( let movieData = 0 ; movieData < result.movies.length; movieData++){
                    $('movie'+movieData).attr(result.movies[movieData]);
                }
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result)
        }
    };
    $.ajax(ajaxConfig);
}
movieDataFrontPage();

function cinemaDataSearchPage() {
    let ajaxConfig = {
        data: {
            location:"33.6441211395679,-117.743128531307",
            limit:4,
            countries:'US',
            fields: 'id,name,telephone,website,location,location.address'
        },
        type: 'GET',
        url: 'https://api.internationalshowtimes.com/v4/cinemas/',
        headers:{
            'X-API-Key': 'UITTMomjJcICW40XNigMoGaaCSykTcYd'
        },
        success: function (result) {
            if (result["success"]) {
                console.log("Results: "+ result);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result)
        }
    };
    $.ajax(ajaxConfig);
}
cinemaDataSearchPage();

