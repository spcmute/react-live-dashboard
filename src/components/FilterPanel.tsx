import { useState } from 'react';
import { Search, RefreshCw, Coins, Cloud, GitBranch } from 'lucide-react';

const COIN_OPTIONS = [
  { id: 'bitcoin', label: 'BTC' },
  { id: 'ethereum', label: 'ETH' },
  { id: 'solana', label: 'SOL' },
  { id: 'cardano', label: 'ADA' },
  { id: 'ripple', label: 'XRP' },
  { id: 'dogecoin', label: 'DOGE' },
];

const INTERVAL_OPTIONS = [
  { value: 10_000, label: '10s' },
  { value: 30_000, label: '30s' },
  { value: 60_000, label: '1m' },
  { value: 300_000, label: '5m' },
];

interface Props {
  open: boolean;
  githubUser: string;
  weatherCity: string;
  cryptoCoins: string[];
  refreshInterval: number;
  onGithubUser: (v: string) => void;
  onWeatherCity: (v: string) => void;
  onCryptoCoins: (v: string[]) => void;
  onRefreshInterval: (v: number) => void;
  onClose: () => void;
}

export default function FilterPanel({
  open, githubUser, weatherCity, cryptoCoins, refreshInterval,
  onGithubUser, onWeatherCity, onCryptoCoins, onRefreshInterval, onClose: _onClose,
}: Props) {
  const [ghInput, setGhInput] = useState(githubUser);
  const [cityInput, setCityInput] = useState(weatherCity);

  function submitGh(e: React.FormEvent) {
    e.preventDefault();
    if (ghInput.trim()) onGithubUser(ghInput.trim());
  }

  function submitCity(e: React.FormEvent) {
    e.preventDefault();
    if (cityInput.trim()) onWeatherCity(cityInput.trim());
  }

  function toggleCoin(id: string) {
    onCryptoCoins(
      cryptoCoins.includes(id)
        ? cryptoCoins.filter(c => c !== id)
        : [...cryptoCoins, id]
    );
  }

  return (
    <aside className={`filter-panel ${open ? 'open' : ''}`}>
      <h2 className="filter-title">Filters</h2>

      <section className="filter-section">
        <label className="filter-label">
          <GitBranch size={14} /> GitHub User
        </label>
        <form onSubmit={submitGh} className="filter-form">
          <input
            className="filter-input"
            value={ghInput}
            onChange={e => setGhInput(e.target.value)}
            placeholder="username"
          />
          <button type="submit" className="filter-btn">
            <Search size={14} />
          </button>
        </form>
      </section>

      <section className="filter-section">
        <label className="filter-label">
          <Cloud size={14} /> Weather City
        </label>
        <form onSubmit={submitCity} className="filter-form">
          <input
            className="filter-input"
            value={cityInput}
            onChange={e => setCityInput(e.target.value)}
            placeholder="city name"
          />
          <button type="submit" className="filter-btn">
            <Search size={14} />
          </button>
        </form>
      </section>

      <section className="filter-section">
        <label className="filter-label">
          <Coins size={14} /> Cryptocurrencies
        </label>
        <div className="coin-grid">
          {COIN_OPTIONS.map(c => (
            <button
              key={c.id}
              className={`coin-chip ${cryptoCoins.includes(c.id) ? 'active' : ''}`}
              onClick={() => toggleCoin(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="filter-section">
        <label className="filter-label">
          <RefreshCw size={14} /> Refresh Interval
        </label>
        <div className="interval-grid">
          {INTERVAL_OPTIONS.map(o => (
            <button
              key={o.value}
              className={`interval-chip ${refreshInterval === o.value ? 'active' : ''}`}
              onClick={() => onRefreshInterval(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
