import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      $('.showWind').text(`The wind speed is ${body.wind.speed} mph.`);
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('.showHumidity').text("");
      $('.showTemp').text("");
      $('.showWind').text("");
    });
  });
  
  $('#zipcodeLocation').click(function() {
    const zipcode = parseInt($('#zipcode').val());
    $('#zipcode').val("");
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${process.env.API_KEY}&units=imperial`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${body.name} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      $('.showWind').text(`The wind speed is ${body.wind.speed} mph.`);
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('.showHumidity').text("");
      $('.showTemp').text("");
      $('.showWind').text("");
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
});