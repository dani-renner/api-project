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
    const zipcode = $('#zipcode').val();
    $('#zipcode').val("");

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