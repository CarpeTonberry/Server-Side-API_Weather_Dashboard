var searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', function () {

    var openWeatherAPI = '2e5e97215308e7ca43c8535a93e6bc4e'
    var searchTerm = document.querySelector('#searchTerm').value;

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchTerm +
        '&appid=' +
        openWeatherAPI)
        .then(function (weatherData) {
            return weatherData.json();
        })
        .then(function (weatherData) {
            console.log(weatherData);
        });

})

// We need to have a section that pulls the history of the previous searches. 
// When the button is pressed, the current time/forecast of the previously selected city 