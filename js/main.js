//Helper function that consumes weather APIs
function getWeatherData(lat, lon) {
    //API key
    var key = "5bef4f9d1bda594aa4e096338d5f39d1";

    //API url
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?";
    apiUrl += "lat=" + lat + "&lon=" + lon + "&units=metric" +
        "&APPID=" + key; // + "&callback=test";

    //API request
    $.ajax({
        url: apiUrl,
        dataType: 'jsonp',
        success: function(result){
            //Send location and weather data to html elements
            json = eval(result);

            $(".location").html(json["name"]);

            temp = Math.floor(json["main"]["temp"])
            $(".temperature").html(temp);

            $(".weather").html(json["weather"][0]["description"]);

            iconId = json["weather"][0]["icon"];
            iconUrl = "http://openweathermap.org/img/w/"
            iconUrl += iconId + ".png";
            $(".weather-icon").html("<img src='" + iconUrl + "' alt='icon'>");
        }
    });
}

//Helper function that displays temperature in selected metric
function applyUnits(celsius, temp) {
    if (celsius) {
        $(".units").html("C");
        $(".temperature").html(temp);
    } else {
        $(".units").html("F");
        $(".temperature").html(Math.floor((temp * 9 / 5) + 32));
    }
}

function setLocAndWeather() {
    $.get("http://ipinfo.io", function(response) {
        var location = response.loc.split(",");
        lat = location[0];
        lon = location[1];
        country = response.country;
        getWeatherData(lat, lon);
    }, "jsonp")
}

//Declaring global variables
var temp = 0;
var lat = "";
var lon = "";
var country = "";
var celsius = true;

$(document).ready(function() {
    //Set location and get weather
    setLocAndWeather();
    console.log(temp);

    //Initialize units display
    applyUnits(celsius, temp);

    //Add units button functionality
    $(".units").on("click", function(){
        celsius = !celsius;
        applyUnits(celsius, temp);
    });

    //Change button style on mouse over
    $(".units").hover(
        function() {
            $(this).css("color", "#0000b3")
                .css("cursor", "pointer");
        },
        function() {
            $(this).css("color", "#0000ff");
        }
    );
});

/* OBSOLETE!
function getPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    });
}

function setWeather(celsius) {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getWeatherData(lat, lon, celsius);
    });
}
*/
