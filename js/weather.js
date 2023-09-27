export class WeatherManager {
   constructor() {
     this.apiKey = '21f086eebec74540a84221859232002';
     this.city = document.querySelector('.city');
     this.settingsWeather = document.querySelector('.settings-weather');
     this.errorBlock = document.querySelector('.weather-error');
     this.temperature = document.querySelector('.temperature');
     this.weatherIcon = document.querySelector('.weather-icon');
     this.wind = document.querySelector('.wind');
     this.weatherDescription = document.querySelector('.weather-description');
     this.humidity = document.querySelector('.humidity');
 
     this.city.addEventListener('keypress', this.setQuery.bind(this));
     this.settingsWeather.addEventListener('click', this.handleSettingsWeatherClick.bind(this));
     document.addEventListener("DOMContentLoaded", this.setQuery.bind(this));
 
     this.getFromLocalStorage();
     this.getWeather();
   }
 
   setQuery(event) {
     if (event && event.type === 'keypress' && event.key !== 'Enter') {
       return;
     }
 
     if (!this.city.value) {
       return null;
     }
 
     localStorage.setItem('city', this.city.value);
     this.getWeather();
   }
 
   async getWeather() {
     const city = this.city.value;
     const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`;
 
     try {
       const response = await fetch(url);
       const weather = await response.json();
       this.displayResults(weather);
     } catch (error) {
       console.error(error);
     }
   }
 
   displayResults(weather) {
     if (weather.error) {
       this.errorBlock.innerHTML = `${weather.error.message}`;
       this.clearWeather();
     } else {
       this.errorBlock.innerHTML = '';
       this.city.innerText = `${weather.location.name}`;
       this.temperature.innerHTML = `Temperature : ${Math.round(weather.current.temp_c)}°c`;
       this.weatherIcon.innerHTML = `<img src=${weather.current.condition.icon}>`;
       this.weatherDescription.innerHTML = `<div>${weather.current.condition.text}</div>`;
       this.wind.innerHTML = `<span>Wind speed : </span>${weather.current.wind_kph}<span>м/c</span>`;
       this.humidity.innerHTML = `<span>Humidity : </span>${weather.current.humidity}<span>%</span>`;
     }
   }
 
   getFromLocalStorage() {
     const city = localStorage.getItem('city');
     if (city) {
       this.city.value = city;
     } else {
       this.city.value = 'Minsk';
     }
   }
 
   clearWeather() {
     this.city.innerText = '';
     this.temperature.innerHTML = '';
     this.weatherIcon.innerHTML = '';
     this.weatherDescription.innerHTML = '';
     this.wind.innerHTML = '';
     this.humidity.innerHTML = '';
   }
 
   handleSettingsWeatherClick() {
     const containerWeather = document.querySelector('.weather-container');
     containerWeather.classList.toggle('hidden');
     this.settingsWeather.classList.toggle('opacity');
   }
 }
 
 // Инициализация класса
 export function initWeather() {
   const weatherManager = new WeatherManager();
 }
 


