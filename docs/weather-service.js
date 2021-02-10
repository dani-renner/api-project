export default class WeatherService {
  static getWeather(city) {
    return new Promise(function(resolve, reject) {
      return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=imperial`).then(function(response){
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      })
    }
  }
  static getWeatherZip(zipcode) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${zipcode}&appid=${process.env.API_KEY}&units=imperial`;
      request.onload = function() {
        if (this.status === 200)  {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
