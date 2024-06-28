import { defineStore } from 'pinia';
import axios from 'axios';

interface Suggestion {
  name: string;
  id: number;
}

interface WeatherData {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  iconUrl: string;
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    query: '' as string,
    suggestions: [] as Suggestion[],
    locationKey: null as number | null,
    weather: null as WeatherData | null,
  }),
  actions: {
    async fetchSuggestions() {
      if (this.query.length < 3) {
        this.suggestions = [];
        return;
      }
      const apiKey = '';
      const url = `http://api.openweathermap.org/data/2.5/find?q=${this.query}&type=like&sort=population&cnt=5&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        this.suggestions = response.data.list.map((city: any) => ({
          name: city.name,
          id: city.id
        }));
      } catch (error) {
        console.error(error);
      }
    },
    selectLocation(suggestion: Suggestion) {
      this.query = suggestion.name;
      this.locationKey = suggestion.id;
      this.suggestions = [];
    },
    async getWeather() {
      if (!this.locationKey) return;

      const apiKey = '';
      const url = `http://api.openweathermap.org/data/2.5/weather?id=${this.locationKey}&units=metric&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        const weatherData = response.data;
        this.weather = {
          name: weatherData.name,
          weather: [{ description: weatherData.weather[0].description, icon: weatherData.weather[0].icon }],
          main: {
            temp: weatherData.main.temp,
            humidity: weatherData.main.humidity
          },
          wind: {
            speed: weatherData.wind.speed
          },
          iconUrl: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        };
      } catch (error) {
        console.error(error);
      }
    }
  }
});
