import { Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, Cloud, Coins, RefreshCw, Filter, BarChart2, LineChart, Zap } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="docs-page">
      <header className="docs-header">
        <Link to="/" className="docs-back">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <div className="docs-hero">
          <h1 className="docs-title">React Live Dashboard</h1>
          <p className="docs-subtitle">
            Interactive real-time dashboard integrating public APIs with dynamic charts,
            custom hooks, and live data refresh.
          </p>
          <div className="docs-badges">
            <span className="badge">React 19</span>
            <span className="badge">TypeScript</span>
            <span className="badge">Recharts</span>
            <span className="badge">React Query</span>
            <span className="badge">Vite</span>
          </div>
        </div>
      </header>

      <main className="docs-main">

        {/* Overview */}
        <section className="docs-section">
          <h2 className="docs-section-title">Overview</h2>
          <p className="docs-text">
            The dashboard aggregates data from three public APIs in real time, displaying
            it through interactive visualizations. All data refreshes automatically at a
            user-configurable interval, and every panel can be customized via the filter
            sidebar.
          </p>
        </section>

        {/* Panels */}
        <section className="docs-section">
          <h2 className="docs-section-title">Panels</h2>
          <div className="docs-cards">

            <div className="docs-card">
              <div className="docs-card-icon github-color">
                <GitBranch size={20} />
              </div>
              <div>
                <h3 className="docs-card-title">GitHub Panel</h3>
                <p className="docs-card-text">
                  Displays a user's public profile — avatar, bio, follower count — alongside
                  a bar chart of star counts for their 10 most recently updated repositories.
                  Each repo card links directly to GitHub and shows language, stars, forks
                  and open issues.
                </p>
                <div className="docs-api-tag">
                  API: <code>api.github.com/users/&#123;user&#125;</code>
                </div>
              </div>
            </div>

            <div className="docs-card">
              <div className="docs-card-icon weather-color">
                <Cloud size={20} />
              </div>
              <div>
                <h3 className="docs-card-title">Weather Panel</h3>
                <p className="docs-card-text">
                  Shows current conditions for any city — temperature, feels-like, humidity
                  and wind speed. Uses Open-Meteo's free geocoding API to resolve city names
                  to coordinates, then fetches live weather data. No API key required.
                </p>
                <div className="docs-api-tag">
                  API: <code>api.open-meteo.com</code>
                </div>
              </div>
            </div>

            <div className="docs-card">
              <div className="docs-card-icon crypto-color">
                <Coins size={20} />
              </div>
              <div>
                <h3 className="docs-card-title">Crypto Panel</h3>
                <p className="docs-card-text">
                  Live cryptocurrency prices with 7-day sparkline charts, 24h percentage
                  change indicators and market cap. Up to 6 coins can be tracked
                  simultaneously. Data auto-refreshes at the selected interval.
                </p>
                <div className="docs-api-tag">
                  API: <code>api.coingecko.com/api/v3/coins/markets</code>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Features */}
        <section className="docs-section">
          <h2 className="docs-section-title">Features</h2>
          <div className="docs-features">
            <div className="docs-feature">
              <Filter size={16} className="feature-icon" />
              <div>
                <strong>Dynamic Filters</strong>
                <p>Change the GitHub user, weather city, active coins, and refresh interval from the sidebar without reloading the page.</p>
              </div>
            </div>
            <div className="docs-feature">
              <RefreshCw size={16} className="feature-icon" />
              <div>
                <strong>Auto-Refresh</strong>
                <p>Crypto data auto-refreshes every 10s, 30s, 1m or 5m. GitHub and weather data are cached for 1 minute and 5 minutes respectively.</p>
              </div>
            </div>
            <div className="docs-feature">
              <BarChart2 size={16} className="feature-icon" />
              <div>
                <strong>Bar Chart — GitHub Stars</strong>
                <p>Built with Recharts BarChart. Each bar is color-coded and shows star count per repository on hover.</p>
              </div>
            </div>
            <div className="docs-feature">
              <LineChart size={16} className="feature-icon" />
              <div>
                <strong>Sparklines — Crypto 7d</strong>
                <p>Mini line charts (Recharts LineChart) rendered per coin showing 7-day price history from CoinGecko's sparkline endpoint.</p>
              </div>
            </div>
            <div className="docs-feature">
              <Zap size={16} className="feature-icon" />
              <div>
                <strong>Loading Skeletons</strong>
                <p>Every panel shows animated skeleton placeholders while fetching, avoiding layout shifts and empty states.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="docs-section">
          <h2 className="docs-section-title">Architecture</h2>
          <div className="docs-arch">
            <div className="docs-arch-col">
              <h3 className="docs-arch-title">Custom Hooks</h3>
              <div className="docs-code-list">
                <div className="code-item"><code>useGitHub(user)</code><span>Fetches profile + repos via React Query</span></div>
                <div className="code-item"><code>useWeather(city)</code><span>Geocodes city → fetches current conditions</span></div>
                <div className="code-item"><code>useCrypto(coins, interval)</code><span>Polls CoinGecko at configurable interval</span></div>
                <div className="code-item"><code>useFilters()</code><span>Global filter state with stable setters</span></div>
              </div>
            </div>
            <div className="docs-arch-col">
              <h3 className="docs-arch-title">Tech Stack</h3>
              <div className="docs-code-list">
                <div className="code-item"><code>React 19 + TypeScript</code><span>UI and type safety</span></div>
                <div className="code-item"><code>@tanstack/react-query</code><span>Server state, caching, deduplication</span></div>
                <div className="code-item"><code>Recharts</code><span>Bar charts and sparklines</span></div>
                <div className="code-item"><code>Axios</code><span>HTTP client for all API calls</span></div>
                <div className="code-item"><code>lucide-react</code><span>Icon set</span></div>
                <div className="code-item"><code>Vite</code><span>Dev server and production build</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* APIs */}
        <section className="docs-section">
          <h2 className="docs-section-title">APIs Used</h2>
          <table className="docs-table">
            <thead>
              <tr>
                <th>API</th>
                <th>Data</th>
                <th>Auth</th>
                <th>Rate Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GitHub REST API v3</td>
                <td>User profile, repositories</td>
                <td>None (public)</td>
                <td>60 req/h unauthenticated</td>
              </tr>
              <tr>
                <td>Open-Meteo</td>
                <td>Geocoding + current weather</td>
                <td>None</td>
                <td>10,000 req/day free</td>
              </tr>
              <tr>
                <td>CoinGecko</td>
                <td>Prices, market cap, sparklines</td>
                <td>None (public)</td>
                <td>~30 req/min demo tier</td>
              </tr>
            </tbody>
          </table>
        </section>

      </main>

      <footer className="docs-footer">
        Built with React + TypeScript · Data from GitHub, Open-Meteo &amp; CoinGecko
      </footer>
    </div>
  );
}
