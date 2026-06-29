import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import GitHubPanel from './components/GitHubPanel';
import WeatherPanel from './components/WeatherPanel';
import CryptoPanel from './components/CryptoPanel';
import { useFilters } from './hooks/useFilters';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

function Dashboard() {
  const {
    filters,
    setGithubUser, setWeatherCity, setCryptoCoins, setRefreshInterval,
  } = useFilters();

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <FilterPanel
          githubUser={filters.githubUser}
          weatherCity={filters.weatherCity}
          cryptoCoins={filters.cryptoCoins}
          refreshInterval={filters.refreshInterval}
          onGithubUser={setGithubUser}
          onWeatherCity={setWeatherCity}
          onCryptoCoins={setCryptoCoins}
          onRefreshInterval={setRefreshInterval}
        />
        <main className="main-grid">
          <div className="grid-top">
            <GitHubPanel username={filters.githubUser} />
            <WeatherPanel city={filters.weatherCity} />
          </div>
          <CryptoPanel
            coins={filters.cryptoCoins}
            refreshInterval={filters.refreshInterval}
          />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
