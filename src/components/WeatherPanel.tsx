import { Wind, Droplets, Thermometer } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

interface Props { city: string }

export default function WeatherPanel({ city }: Props) {
  const { data, isLoading, error } = useWeather(city);

  if (isLoading) return (
    <div className="card skeleton-card">
      <div className="skeleton-tag" />
      <div className="skeleton-icon" />
      <div className="skeleton-line wide" />
      <div className="skeleton-line medium" />
    </div>
  );

  if (error || !data) return (
    <div className="card error-card">
      <span className="card-tag weather">Weather</span>
      <p className="error-msg">City not found or API unavailable</p>
    </div>
  );

  return (
    <div className="card weather-card">
      <div className="card-header">
        <span className="card-tag weather">Weather</span>
        <h3 className="card-title">{data.city}, {data.country}</h3>
      </div>

      <div className="weather-main">
        <span className="weather-icon">{data.icon}</span>
        <div>
          <p className="weather-temp">{data.temperature}°C</p>
          <p className="weather-desc">{data.description}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-stat">
          <Thermometer size={14} className="text-orange" />
          <span>Feels {data.feels_like}°C</span>
        </div>
        <div className="weather-stat">
          <Droplets size={14} className="text-blue" />
          <span>{data.humidity}% humidity</span>
        </div>
        <div className="weather-stat">
          <Wind size={14} className="text-teal" />
          <span>{data.wind_speed} m/s</span>
        </div>
      </div>
    </div>
  );
}
