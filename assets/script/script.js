var searchHistoryArray = [];
var loadSearchHistory = JSON.parse(localStorage.getItem('Searched Cities'));
var checkSearchHistory = localStorage.getItem('Searched Cities', searchTerm)
var searchButton = document.querySelector('#lastResults1');
var searchButton = document.querySelector('#lastResults2');
var searchButton = document.querySelector('#lastResults3');
var searchButton = document.querySelector('#lastResults4');
var searchButton = document.querySelector('#lastResults5');
var searchButton = document.querySelector('#lastResults6');
var searchButton = document.querySelector('#lastResults7');
var searchButton = document.querySelector('#lastResults8');
var searchButton = document.querySelector('#lastResults9');
var searchButton = document.querySelector('#lastResults10');

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


// JS array that pulls the search cities array AND THEN you would do the search THEN check if the vaule is in the array 

preSetUp();

function preSetUp() {
    if (localStorage.getItem('Searched Cities') === null) {
        localStorage.setItem('Searched Cities', "Are you ready for it?")
    }
    else {
        searchHistoryArray = searchHistoryArray.concat(loadSearchHistory);
        for (var i = 0; i < searchHistoryArray.length; i += 1) {
            console.log(searchHistoryArray);
        }
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
                // Check localStorage if current search term exists <----- THIS FUNCTION IS STILL NOT WORKING!
                if (checkSearchHistory === searchHistoryArray) {
                    console.log("Hello World!")
                }
                else {
                    // Add new search term to the begining of the searchHistoryArray
                    searchHistoryArray.unshift(searchTerm);
                    saveLastCity();
                }
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

                                // Day 1 Forecast Data Pull 
                                var day1ForeCast = moment(forecast[0].dt_txt).format('MM/DD/YYYY');
                                var weatherIconForecast1 = document.createElement('img')
                                weatherIconForecast1.setAttribute("src", `https://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`);
                                var tempForecast1Data = forecast[0].main.temp;
                                var windForecast1Data = forecast[0].wind.speed;
                                var humidityForecast1Data = forecast[0].main.humidity;

                                // Day 2 Forecast Data Pull
                                var day2ForeCast = moment(forecast[8].dt_txt).format('MM/DD/YYYY');
                                var weatherIconForecast2 = document.createElement('img')
                                weatherIconForecast2.setAttribute("src", `https://openweathermap.org/img/wn/${forecast[8].weather[0].icon}@2x.png`);
                                var tempForecast2Data = forecast[8].main.temp;
                                var windForecast2Data = forecast[8].wind.speed;
                                var humidityForecast2Data = forecast[8].main.humidity;

                                // Day 3 Forecast Data Pull
                                var day3ForeCast = moment(forecast[16].dt_txt).format('MM/DD/YYYY');
                                var weatherIconForecast3 = document.createElement('img')
                                weatherIconForecast3.setAttribute("src", `https://openweathermap.org/img/wn/${forecast[16].weather[0].icon}@2x.png`);
                                var tempForecast3Data = forecast[16].main.temp;
                                var windForecast3Data = forecast[16].wind.speed;
                                var humidityForecast3Data = forecast[16].main.humidity;

                                // Day 4 Forecast Data Pull
                                var day4ForeCast = moment(forecast[24].dt_txt).format('MM/DD/YYYY');
                                var weatherIconForecast4 = document.createElement('img')
                                weatherIconForecast4.setAttribute("src", `https://openweathermap.org/img/wn/${forecast[24].weather[0].icon}@2x.png`);
                                var tempForecast4Data = forecast[24].main.temp;
                                var windForecast4Data = forecast[24].wind.speed;
                                var humidityForecast4Data = forecast[24].main.humidity;

                                // Day 5 Forecast Data Pull
                                var day5ForeCast = moment(forecast[32].dt_txt).format('MM/DD/YYYY');
                                var weatherIconForecast5 = document.createElement('img')
                                weatherIconForecast5.setAttribute("src", `https://openweathermap.org/img/wn/${forecast[32].weather[0].icon}@2x.png`);
                                var tempForecast5Data = forecast[32].main.temp;
                                var windForecast5Data = forecast[32].wind.speed;
                                var humidityForecast5Data = forecast[32].main.humidity;

                                // Day 1 Forecast Data Set
                                fiveDayForecast1.textContent = day1ForeCast
                                weatherIconForecast1.style.height = '30px'
                                weatherIconForecast1.style.width = '30px'
                                fiveDayForecast1.appendChild(weatherIconForecast1);
                                var tempForecast1 = document.createElement("div");
                                tempForecast1.textContent = 'Temp: ' + tempForecast1Data + ' °F';
                                fiveDayForecast1.appendChild(tempForecast1);
                                var windForecast1 = document.createElement("div");
                                windForecast1.textContent = "Wind: " + windForecast1Data + ' MPH';
                                fiveDayForecast1.appendChild(windForecast1);
                                var humidityForecast1 = document.createElement("div");
                                humidityForecast1.textContent = 'Humidity: ' + humidityForecast1Data + ' %';
                                fiveDayForecast1.appendChild(humidityForecast1);

                                // Day 2 Forecast Data Set
                                fiveDayForecast2.textContent = day2ForeCast
                                weatherIconForecast2.style.height = '30px'
                                weatherIconForecast2.style.width = '30px'
                                fiveDayForecast2.appendChild(weatherIconForecast2);
                                var tempForecast2 = document.createElement("div");
                                tempForecast2.textContent = 'Temp: ' + tempForecast2Data + ' °F';
                                fiveDayForecast2.appendChild(tempForecast2);
                                var windForecast2 = document.createElement("div");
                                windForecast2.textContent = "Wind: " + windForecast2Data + ' MPH';
                                fiveDayForecast2.appendChild(windForecast2);
                                var humidityForecast2 = document.createElement("div");
                                humidityForecast2.textContent = 'Humidity: ' + humidityForecast2Data + ' %';
                                fiveDayForecast2.appendChild(humidityForecast2);

                                // Day 3 Forecast Data Set
                                fiveDayForecast3.textContent = day3ForeCast
                                weatherIconForecast3.style.height = '30px'
                                weatherIconForecast3.style.width = '30px'
                                fiveDayForecast3.appendChild(weatherIconForecast3);
                                var tempForecast3 = document.createElement("div");
                                tempForecast3.textContent = 'Temp: ' + tempForecast3Data + ' °F';
                                fiveDayForecast3.appendChild(tempForecast3);
                                var windForecast3 = document.createElement("div");
                                windForecast3.textContent = "Wind: " + windForecast3Data + ' MPH';
                                fiveDayForecast3.appendChild(windForecast3);
                                var humidityForecast3 = document.createElement("div");
                                humidityForecast3.textContent = 'Humidity: ' + humidityForecast3Data + ' %';
                                fiveDayForecast3.appendChild(humidityForecast3);

                                // Day 4 Forecast Data Set
                                fiveDayForecast4.textContent = day4ForeCast
                                weatherIconForecast4.style.height = '30px'
                                weatherIconForecast4.style.width = '30px'
                                fiveDayForecast4.appendChild(weatherIconForecast4);
                                var tempForecast4 = document.createElement("div");
                                tempForecast4.textContent = 'Temp: ' + tempForecast4Data + ' °F';
                                fiveDayForecast4.appendChild(tempForecast4);
                                var windForecast4 = document.createElement("div");
                                windForecast4.textContent = "Wind: " + windForecast4Data + ' MPH';
                                fiveDayForecast4.appendChild(windForecast4);
                                var humidityForecast4 = document.createElement("div");
                                humidityForecast4.textContent = 'Humidity: ' + humidityForecast4Data + ' %';
                                fiveDayForecast4.appendChild(humidityForecast4);

                                // Day 5 Forecast Data Set
                                fiveDayForecast5.textContent = day5ForeCast
                                weatherIconForecast5.style.height = '30px'
                                weatherIconForecast5.style.width = '30px'
                                fiveDayForecast5.appendChild(weatherIconForecast5);
                                var tempForecast5 = document.createElement("div");
                                tempForecast5.textContent = 'Temp: ' + tempForecast5Data + ' °F';
                                fiveDayForecast5.appendChild(tempForecast5);
                                var windForecast5 = document.createElement("div");
                                windForecast5.textContent = "Wind: " + windForecast5Data + ' MPH';
                                fiveDayForecast5.appendChild(windForecast5);
                                var humidityForecast5 = document.createElement("div");
                                humidityForecast5.textContent = 'Humidity: ' + humidityForecast5Data + ' %';
                                fiveDayForecast5.appendChild(humidityForecast5);
                            }
                        })
                }
            }
        })
})