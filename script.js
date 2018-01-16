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