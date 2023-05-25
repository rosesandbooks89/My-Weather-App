var apiKey = "8bb6c2d489759cc78039c821cced7698";
var cityInput = document.getElementById("cityInput");
var searchHistory = [];

// Function to fetch current weather
function getCurrentWeather(cityName) {
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            getFiveDayWeather(cityName);
        });
}

// Function to fetch the 5-day weather forecast
function getFiveDayWeather(cityName) {
    var fiveDayWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(fiveDayWeatherURL)
        .then(response => response.json())
        .then(data => {
            displayFiveDayWeather(data.list);
        });
}

// TODO: Default funtion (not sure)

// TODO: function for temperture converter may be needed. / got from W3Schools 
function temperatureConverter(temp) {
    return Math.round(((temp - 273.15) * 1.8) + 32);
}


// Function to display the current weather
// TODO: convert temperture to Fahrenheit and add icon weather to function. 
function displayCurrentWeather(data) {
    var cityName = document.getElementById("cityName");
    var date = document.querySelector(".date-");
    var temp = document.getElementById("dTemp-0");
    var wind = document.getElementById("dWind-0");
    var humidity = document.getElementById("dHumidity-0");
        document.getElementById("img-");

    
    cityName.textContent = data.name;
    temp.textContent = "Temperature: " + temperatureConverter(data.main.temp) + "°F";
    wind.textContent = "Wind: " + data.wind.speed;
    humidity.textContent = "Humidity: " + data.main.humidity;
    console.log("Current Weather Data:", data);
}

// Function to display the 5-day weather forecast
// TODO: convert temperture to Fahrenheit
function displayFiveDayWeather(weatherList) {
    for (var i = 0; i < 5; i++) {
        var date = document.querySelector(".date-" + (i + 1));
        var temp = document.getElementById("dTemp-" + (i + 1));
        var wind = document.getElementById("dWind-" + (i + 1));
        var humidity = document.getElementById("dHumidity-" + (i + 1));
        var icon = document.getElementById("img-" + (i + 1));

        var weatherData = weatherList[i];
        date.textContent = new Date(weatherData.dt * 1000).toLocaleDateString();
        temp.textContent = "Temperature: " + temperatureConverter(weatherData.main.temp) + "°F";
        wind.textContent = "Wind: " + weatherData.wind.speed;
        humidity.textContent = "Humidity: " + weatherData.main.humidity;
        icon.src = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png";
        icon.alt = weatherData.weather[0].description;
    }
}

// Event listener for the search button
document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var city = cityInput.value.trim();

    if (city) {
        getCurrentWeather(city);
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            saveSearchHistory();
            displaySearchHistory();
        }
    }
    cityInput.value = "";
});

// Function to save search history to local storage
function saveSearchHistory() {
    localStorage.setItem("history", JSON.stringify(searchHistory));
}

// Function to display search history
function displaySearchHistory() {
    var historyList = document.querySelector(".history");
    historyList.innerHTML = "";

    searchHistory.forEach(function (city) {
        var li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", function () {
            cityInput.value = city;
            getCurrentWeather(city);
        });
        historyList.appendChild(li);
    });
}

// Load search history from local storage
function loadSearchHistory() {
    var history = localStorage.getItem("history");
    if (history) {
        searchHistory = JSON.parse(history);
        displaySearchHistory();
    }
}

// Call the loadSearchHistory function when the page loads
loadSearchHistory();