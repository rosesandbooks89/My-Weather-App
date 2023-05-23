// api key 76282a5772fc410e30d3610f2470567d
var APIKey = "76282a5772fc410e30d3610f2470567d";
var city;
var searchButton = document.getElementById("search-button");
var typedText = document.getElementById("typed-text");
var coordinates =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  "&limit=1&appid=76282a5772fc410e30d3610f2470567d";
var allweatherapi =
  "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=76282a5772fc410e30d3610f2470567d";

// button click search a city
function searchWeather(event) {
  event.preventDefault();
  //console.log("click")
  var coordinates =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    typedText +
    "&limit=1&appid=76282a5772fc410e30d3610f2470567d";
  //console.log(city)
  // city = input.value
  console.log(coordinates);
  fetch(coordinates)
    .then(function (data) {
      return data.json();
    })
    .then(function (test) {
      console.log(test);
    });
}
//grab value from html to use in button function

//call to another api for lat/lon
//api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}

//presented with current city conditions

//present 5 day forcast

http: searchButton.addEventListener("click", searchWeather);
