//Helper function that consumes weather APIs
function getWeatherData(lat, lon, celsius) {
    //Temperature units
    var units = "";
    if (celsius) {
        units = "metric";
    } else {
        units = "imperial";
    };

    //API key
    var key = "5bef4f9d1bda594aa4e096338d5f39d1";

    //API url
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?";
    apiUrl += "lat=" + lat + "&lon=" + lon + "&units=" + units +
        "&APPID=" + key; // + "&callback=test";

    //API request
    $.ajax({
        url: apiUrl,
        dataType: 'jsonp',
        success: function(result){
            //Send location and weather data to html elements
            json = eval(result);

            $(".location").html(json["name"]);

            $(".temperature").html(Math.floor(json["main"]["temp"]));

            $(".weather").html(json["weather"][0]["description"]);

            iconId = json["weather"][0]["icon"];
            iconUrl = "http://openweathermap.org/img/w/"
            iconUrl += iconId + ".png";
            $(".weather-icon").html("<img src='" + iconUrl + "' alt='icon'>");
        }
    });
}

//Helper function that displays selected temperature metric
function applyUnits(celsius) {
    if (celsius) {
        $(".units").html("C");
    } else {
        $(".units").html("F");
    }
}

function setWeather(celsius) {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getWeatherData(lat, lon, celsius);
    });
}

$(document).ready(function() {
    //Initialize units and position
    var celsius = true;
    var lat = "";
    var lon = "";

    //Initialize units display
    applyUnits(celsius);

    //Get Weather data
    setWeather(celsius);

    //Units button functionality
    $(".units").on("click", function(){
        celsius = !celsius;
        applyUnits(celsius);
        setWeather(celsius);
    });

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

/*
function getPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    });
}
*/
