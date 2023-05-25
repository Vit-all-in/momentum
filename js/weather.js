export function getWeather() {
   const apiKey = '21f086eebec74540a84221859232002'
   let city = document.querySelector('.city')
   const settingsWeather = document.querySelector('.settings-weather')

   city.addEventListener('keypress', setQuery)

   if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
   } else {
      city.value = 'Minsk'
   }

   function setQuery() {
      if (!city.value) return null;
      localStorage.setItem('city', city.value);
      getResults(city.value);
   }

   async function getResults(city) {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

      try {
         await fetch(url).then((response) => {
         return response.json()
      }).then(displayResults)
      } catch (error) {
         
      }
   }

   function displayResults(weather) {

      let errorBlock = document.querySelector('.weather-error');
      let city = document.querySelector('.city');
      let temperature = document.querySelector('.temperature');
      let weatherIcon = document.querySelector('.weather-icon');
      let wind = document.querySelector('.wind');  
      let weatherDescription = document.querySelector('.weather-description');
      let humidity = document.querySelector('.humidity');

      if (weather.error) {
         errorBlock.innerHTML = `${weather.error.message}`
         city.innerText = '';
         temperature.innerHTML = '';
         weatherIcon.innerHTML = ''
         weatherDescription.innerHTML = ''
         wind.innerHTML = ''
         humidity.innerHTML = ''
      } else {
         errorBlock.innerHTML = '';
         city.innerText = `${weather.location.name}`;
         temperature.innerHTML = `Temperature : ${Math.round(weather.current.temp_c)}°c`;
         weatherIcon.innerHTML = `<img src = ${weather.current.condition.icon}>`
         weatherDescription.innerHTML = `<div>${weather.current.condition.text}</div>`;
         wind.innerHTML = `<span>Wind speed : </span>${weather.current.wind_kph}<span>м/c</span>`;
         humidity.innerHTML = `<span>Humidity : </span>${weather.current.humidity}<span>%</span>`;
      }
   }

   settingsWeather.addEventListener('click', () => {
      const containerWeather = document.querySelector('.weather-container');
      containerWeather.classList.toggle('hidden');
      settingsWeather.classList.toggle('opacity');
   });
   
   document.addEventListener("DOMContentLoaded", setQuery) 
}
 


