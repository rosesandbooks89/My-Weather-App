// api key 76282a5772fc410e30d3610f2470567d
var APIKey = "76282a5772fc410e30d3610f2470567d";
var city;
// var today = document.getElementById("today");
// var forecast = document.getElementById("forecast");
var searchButton = document.getElementById("search-button");
var typedText = document.getElementById("typed-text");
var coordinates =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  "&limit=1&appid=76282a5772fc410e30d3610f2470567d";
var mainEl = document.querySelector('#weather-main');
//grab value from html to use in button function
// button click search a city
//call to another api for lat/lon
function searchWeather(event) {
  event.preventDefault();
  //console.log("click")
  var coordinates =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    typedText +
    "&limit=1&appid=76282a5772fc410e30d3610f2470567d";
  console.log(coordinates);
  fetch(coordinates)
    .then(function (data) {
      return data.json();
    })
    .then(function (getCoords) {
      let lat = getCoords[0].lat;
      let lon = getCoords[0].lon;
      currentWeather(lat, lon);
    });
}
function currentWeather(lat, lon) {
  console.log(lat, lon);
  var allweatherapi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=76282a5772fc410e30d3610f2470567d`;
  fetch (allweatherapi) 
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          for (var i = 0; i < data.list.length; i += 8) {
            generateWeatherCard(data.list[i]);
          }
         
        //   displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to grab weather");
    });
}
//date temp wind humidity
//presented with current city conditions (increments 0,8,16,24)
//present 5 day forcast
function generateWeatherCard(weatherData) {
    var date = dayjs(weatherData.dt_txt).format('M/D/YYYY');
    var temp = weatherData.main.temp;
    var wind = weatherData.wind.speed;
    var humidity = weatherData.main.humidity;
    console.log(date, temp, wind, humidity);

    // Creating Card 
    var cardEl = document.createElement('div');
    cardEl.setAttribute('class', 'card');
    cardEl.setAttribute('style', 'width: 18rem;');
    
    // Creating Card body
    var cardBodyEl = document.createElement('div');
    cardBodyEl.setAttribute('class', 'card-body')
    cardEl.append(cardBodyEl);

    // Creating Card Title
    var cardTitleEl = document.createElement('h5');
    cardTitleEl.setAttribute('class', 'card-title');
    cardTitleEl.textContent = date;

    // Creating card body content
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    tempEl.textContent = 'Temp: ' + temp;
    windEl.textContent = 'Wind: ' + wind;
    humidityEl.textContent = 'Humidity: ' + humidity + '%';

    // appending to card body
    cardBodyEl.append(cardTitleEl);
    cardBodyEl.append(tempEl);
    cardBodyEl.append(windEl);
    cardBodyEl.append(humidityEl);

    mainEl.append(cardEl);
}



searchButton.addEventListener("click", searchWeather);
