<template>
     <div class="weather-app">
       <input
         v-model="query"
         @input="fetchSuggestions"
         placeholder="Enter location"
         class="location-input"
       />
       <ul v-if="suggestions.length" class="suggestions">
         <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectLocation(suggestion)">
           {{ suggestion.name }}
         </li>
       </ul>
       <button @click="getWeather" class="weather-button">Get Weather</button>
   
       <div v-if="weather" class="weather-details">
         <h3>{{ weather.name }}</h3>
         <p>{{ weather.weather[0].description }}</p>
         <p>{{ weather.main.temp }}°C</p>
         <p>Humidity: {{ weather.main.humidity }}%</p>
         <p>Wind Speed: {{ weather.wind.speed }} m/s</p>
         <img :src="weather.iconUrl" :alt="weather.weather[0].description" class="weather-icon" />
       </div>
     </div>
   </template>
   
   <script lang="ts">
   import { defineComponent } from 'vue';
   import { useWeatherStore } from '../stores/weather';
   import { storeToRefs } from 'pinia';
   
   export default defineComponent({
     name: 'Weather',
     setup() {
       const weatherStore = useWeatherStore();
       const { query, suggestions, weather } = storeToRefs(weatherStore);
       const { fetchSuggestions, selectLocation, getWeather } = weatherStore;
   
       return {
         query,
         suggestions,
         weather,
         fetchSuggestions,
         selectLocation,
         getWeather
       };
     }
   });
   </script>
   
   <style scoped>
   .weather-app {
     font-family: Arial, sans-serif;
     text-align: center;
     padding: 2em;
   }
   
   .location-input {
     padding: 0.5em;
     margin: 1em 0;
     width: 80%;
     max-width: 400px;
   }
   
   .suggestions {
     list-style: none;
     padding: 0;
     margin: 0;
     max-width: 400px;
     margin: 0 auto;
     border: 1px solid #ccc;
     background: #fff;
   }
   
   .suggestions li {
     padding: 0.5em;
     cursor: pointer;
   }
   
   .suggestions li:hover {
     background: #f0f0f0;
   }
   
   .weather-button {
     padding: 0.5em 1em;
     background: #007bff;
     color: #fff;
     border: none;
     cursor: pointer;
   }
   
   .weather-button:hover {
     background: #0056b3;
   }
   
   .weather-details {
     margin-top: 2em;
   }
   
   .weather-icon {
     width: 100px;
     height: 100px;
     margin-top: 1em;
   }
   </style>
   