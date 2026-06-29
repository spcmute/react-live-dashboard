export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  description: string | null;
  updated_at: string;
  html_url: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
}

export interface WeatherData {
  city: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  country: string;
}

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  sparkline_in_7d?: { price: number[] };
}

export interface FilterState {
  githubUser: string;
  weatherCity: string;
  cryptoCoins: string[];
  refreshInterval: number;
}
