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
        var container = $("#container");
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