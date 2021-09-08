var searchHistoryArray = [];

var searchButton = document.querySelector('#searchButton');
var openWeatherAPI = '2e5e97215308e7ca43c8535a93e6bc4e'

var loadSearchHistory = localStorage.getItem('Searched Cities')
// Append Searched Cities results to the HTML 
// We only need to recall the last 10 resuls 

var saveLastCity = function () {
    localStorage.setItem("Searched Cities", JSON.stringify(searchHistoryArray))
}

// Event Handler
searchButton.addEventListener('click', function () {

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
            // Check if any code is not = to 200
            if (weatherData.cod != '200') {
                alert("Enter a valid city!");
            } else {
                console.log(weatherData);
                // Add new search term to the begining of the searchHistoryArray
                searchHistoryArray.unshift(searchTerm);
                saveLastCity();
            }
        })
})