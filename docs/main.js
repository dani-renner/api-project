import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=imperial`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      console.log(response);
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${parseInt(response.main.temp)} degrees.`);
      $('.showWind').text(`The wind speed is ${response.wind.speed} mph.`);
      // const rain = response.rain && response.rain["1h"]
    }
  });
  
  $('#zipcodeLocation').click(function() {
    const zipcode = parseInt($('#zipcode').val());
    $('#zipcode').val("");

    function checkNumber(number) {
      if (isNaN(number) || number < 0) {
        return new Error("Not a valid number!");
      } else {
        return true;
      }
    }

    try {
      const isNumberValid = checkNumber(zipcode);
      if (isNumberValid instanceof Error) {
        console.error(isNumberValid.message);
        throw RangeError("Not a valid number!");
      } else {
        console.log("Try was successful, so no need to catch!");
        $('#showErrors').text("This number is valid. You may continue.")
      }
      } catch(error) {
        console.error(`Red alert! We have an error: ${error.message}`)
      }
      
    


    let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${process.env.API_KEY}&units=imperial`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      console.log(response);
      $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${parseInt(response.main.temp)} degrees.`);
      $('.showWind').text(`The wind speed is ${response.wind.speed} mph.`);
      // const rain = response.rain && response.rain["1h"]
    }
  });

});