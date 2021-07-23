//Create Module to hold controllers
let app = angular.module("Weather-App", []);



// Converts unix into Local Time

function convertTime(unix,offset){
    var date = new Date();
    let unix_timestamp = unix;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.

    var utc = ((unix_timestamp * 1000));

    var nd = new Date(utc + (offset));
    
    // Splits nd.toUTCString(); to only show time 07:56:53 GMT
    let time = nd.toUTCString().slice(16,29);
    return time;
}

// Identifies WHAT THE WEATHER Is and displays a custom backgroun

/*
 *
 * CONTROLLERS 
 * 
 */


app.controller("Weather", function ($scope, $http) {

    // Create http request and Function to call when to return object

    // API CALL
    $scope.search = function (cityName) {
        let promise = $http.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=f1f37a98440d58322013f18786d396a1");

        //.then promise method
        promise.then(
            function (response) {
                // Converts data from API call into a JSON object
                $scope.data = response.data;
                $scope.city = cityName;
                $scope.error = '';

                /* RETURNS THIS
                   
                */

                // Converts Farenhiet to Celcius and formats tempature
                $scope.celcius = (($scope.data.main.temp - 32) * (5/9)).toFixed(0);
                $scope.farenheit = $scope.data.main.temp.toFixed(0);

                // Retrieves Weather ICON based ON icon code
                $scope.icon = ("http://openweathermap.org/img/w/" +$scope.data.weather[0].icon +".png");

                // Converts UNIX INTO LOCAL TIME
                // Sunrise
                $scope.sunrise = convertTime($scope.data.sys.sunrise,$scope.data.timezone)

                // Sunset
                $scope.sunset = convertTime($scope.data.sys.sunset,$scope.data.timezone)
                // changes display from none to block
                
            },
            function (reason) {
                $scope.error = "Enter a valid City"
                $scope.username = '';
                $scope.city = '';
                info.style.display = "none";
                centerInfo.style.display = "none";
            }
        )
    }
}
);