var searchHistoryArray = [];
var loadSearchHistory = JSON.parse(localStorage.getItem('Searched Cities'));

var currentDate = moment().format('MM/DD/YY');

var citySelected = document.querySelector('.city-name');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var UVIndex = document.querySelector('.UVIndex');

var fiveDayForecastTitle = document.querySelector('#five-day-forecast-title')
var fiveDayForecast1 = document.querySelector('#five-day-forecast-1')
var fiveDayForecast2 = document.querySelector('#five-day-forecast-2')
var fiveDayForecast3 = document.querySelector('#five-day-forecast-3')
var fiveDayForecast4 = document.querySelector('#five-day-forecast-4')
var fiveDayForecast5 = document.querySelector('#five-day-forecast-5')

var searchButton = document.querySelector('#searchButton');
var openWeatherAPI = '2e5e97215308e7ca43c8535a93e6bc4e'

preSetUp();

function preSetUp() {
    if (localStorage.getItem('Searched Cities') === null) {
        localStorage.setItem('Searched Cities', "Are you ready for it?")
    }
    else {
        searchHistoryArray = searchHistoryArray.concat(loadSearchHistory);
    }
}

function saveLastCity() {
    localStorage.setItem("Searched Cities", JSON.stringify(searchHistoryArray))
}

// Event Handler
searchButton.addEventListener('click', function () {

    var searchTerm = document.querySelector('#searchTerm').value;

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchTerm +
        '&units=imperial&appid=' +
        openWeatherAPI)
        .then(function (weatherData) {
            return weatherData.json();
        })
        .then(function (weatherData) {
            // Check if any code is not = to 200
            if (weatherData.cod != '200') {
                alert("Enter a valid city!");
            } else {
                console.log(weatherData);
                // Add new search term to the begining of the searchHistoryArray
                searchHistoryArray.unshift(searchTerm);
                saveLastCity();
                // Pull following data from Object
                var cityValue = weatherData.name;
                var tempValue = weatherData.main.temp;
                var windValue = weatherData.wind.speed;
                var humidityValue = weatherData.main.humidity;
                var lat = weatherData.coord.lat;
                var lon = weatherData.coord.lon;

                citySelected.innerHTML = cityValue +
                    " (" +
                    currentDate +
                    ")";

                var weatherIcon = document.createElement('img')
                weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
                citySelected.appendChild(weatherIcon);

                temp.innerHTML = 'Temp: ' + tempValue + ' °F';
                wind.innerHTML = 'Wind: ' + windValue + ' MPH';
                humidity.innerHTML = 'Humidity: ' + humidityValue + ' %';

                UVIndexResults();
                function UVIndexResults() {
                    var reRun = 'https://api.openweathermap.org/data/2.5/uvi?appid=' +
                        openWeatherAPI +
                        '&lat=' +
                        lat +
                        '&lon=' +
                        lon;

                    fetch(reRun)
                        .then(function (weatherData2) {
                            return weatherData2.json();
                        })
                        .then(function (weatherData2) {
                            console.log(weatherData2)
                            UVIndex.innerHTML = 'UV Index: ' + weatherData2.value;
                        })
                }

                fiveDayForecastTitle.textContent = '5-Day Forecast:'

                fiveDayForecastResults();
                function fiveDayForecastResults() {
                    var reReRun = 'https://api.openweathermap.org/data/2.5/forecast?q=' +
                        searchTerm +
                        '&units=imperial&appid=' +
                        openWeatherAPI;

                    fetch(reReRun)
                        .then(function (weatherData3) {
                            return weatherData3.json();
                        })
                        .then(function (weatherData3) {
                            console.log(weatherData3)
                            var forecast = weatherData3.list;
                            for (var i = 0; i < forecast.length; i += 8) {
                                var weeklyForecast = forecast[i];
                                console.log(weeklyForecast)
                            }
                            // how do I pull data from the objects???
                        })
                        .then(function (thisNextFunction) {

                            fiveDayForecast1.textContent = "Hello World!"
                            fiveDayForecast2.textContent = "Hello World!"
                            fiveDayForecast3.textContent = "Hello World!"
                            fiveDayForecast4.textContent = "Hello World!"
                            fiveDayForecast5.textContent = "Hello World!"
                        })
                }
            }
        })
})