import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherService from './weather-service.js';

function clearFields()  {
  $('#location').val("");
  $(".showErrors").text("");
  $(".showHumidity").text("");
  $(".showTemp").text("");
  $(".showWind").text("");
  $('#zipcode').val("");
}
function getElements(response) {
  if (response.main) {
    $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    $(".showTemp").text(`The temperature is ${parseInt(response.main.temp)} degrees.`);
    $(".showWind").text(`The wind speed is ${response.wind.speed} mph.`);
  }
  else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}


$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    WeatherService.getWeather(city)
    .then(function(response) {
      getElements(response);
    });
  });
  
  $('#zipcodeLocation').click(function() {
    let zipcode = parseInt($('#zipcode').val());
    clearFields();
    let promise = WeatherService.getWeatherZip(zipcode);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${body.name} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${parseInt(body.main.temp)} degrees.`);
      $('.showWind').text(`The wind speed is ${body.wind.speed} mph.`);
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});
// function checkNumber(number) {
//   if (isNaN(number) || number < 0) {
//     return new Error("Not a valid number!");
//   } else {
//     return true;
//   }
// }

// try {
//   const isNumberValid = checkNumber(zipcode);
//   if (isNumberValid instanceof Error) {
//     console.error(isNumberValid.message);
//     throw RangeError("Not a valid number!");
//   } else {
//     console.log("Try was successful, so no need to catch!");
//     $('#showErrors').text("This number is valid. You may continue.");
//   }
//   } catch(error) {
//     console.error(`Red alert! We have an error: ${error.message}`);
//   }