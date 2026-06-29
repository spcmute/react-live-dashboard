import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { WeatherData } from '../types';

// Using open-meteo (no API key required) + geocoding
async function geocode(city: string): Promise<{ lat: number; lon: number; country: string }> {
  const { data } = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en`
  );
  if (!data.results?.length) throw new Error('City not found');
  const r = data.results[0];
  return { lat: r.latitude, lon: r.longitude, country: r.country_code };
}

export function useWeather(city: string) {
  return useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: async () => {
      const { lat, lon, country } = await geocode(city);
      const { data } = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&wind_speed_unit=ms`
      );
      const c = data.current;
      const code: number = c.weather_code;
      const icon = weatherIcon(code);
      return {
        city,
        temperature: Math.round(c.temperature_2m),
        feels_like: Math.round(c.apparent_temperature),
        humidity: c.relative_humidity_2m,
        description: weatherDesc(code),
        icon,
        wind_speed: c.wind_speed_10m,
        country,
      };
    },
    enabled: !!city,
    staleTime: 300_000,
  });
}

function weatherDesc(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 49) return 'Foggy';
  if (code <= 59) return 'Drizzle';
  if (code <= 69) return 'Rain';
  if (code <= 79) return 'Snow';
  if (code <= 82) return 'Rain showers';
  if (code <= 86) return 'Snow showers';
  return 'Thunderstorm';
}

function weatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 49) return '🌫️';
  if (code <= 69) return '🌧️';
  if (code <= 79) return '❄️';
  if (code <= 82) return '🌦️';
  return '⛈️';
}
