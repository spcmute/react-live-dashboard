import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCrypto } from '../hooks/useCrypto';
import { formatPrice, formatNumber } from '../utils/format';

interface Props {
  coins: string[];
  refreshInterval: number;
}

export default function CryptoPanel({ coins, refreshInterval }: Props) {
  const { data, isLoading, error, dataUpdatedAt } = useCrypto(coins, refreshInterval);

  if (!coins.length) return (
    <div className="card error-card">
      <span className="card-tag crypto">Crypto</span>
      <p className="error-msg">Select at least one coin in Filters</p>
    </div>
  );

  if (isLoading) return (
    <div className="card skeleton-card">
      <div className="skeleton-tag" />
      {[0, 1, 2].map(i => (
        <div key={i} className="skeleton-crypto-row">
          <div className="skeleton-circle" />
          <div style={{ flex: 1 }}>
            <div className="skeleton-line medium" />
            <div className="skeleton-line" />
          </div>
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );

  if (error || !data) return (
    <div className="card error-card">
      <span className="card-tag crypto">Crypto</span>
      <p className="error-msg">Failed to load crypto data (rate limited?)</p>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-tag crypto">Crypto</span>
        <h3 className="card-title">Live Prices</h3>
        {dataUpdatedAt && (
          <span className="last-updated">
            Updated {new Date(dataUpdatedAt).toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className="crypto-list">
        {data.map(coin => {
          const positive = coin.price_change_percentage_24h >= 0;
          const sparkData = coin.sparkline_in_7d?.price.map((p, i) => ({ i, p })) ?? [];
          const lineColor = positive ? '#22c55e' : '#ef4444';

          return (
            <div key={coin.id} className="crypto-row">
              <img src={coin.image} alt={coin.name} className="crypto-logo" />

              <div className="crypto-info">
                <span className="crypto-name">{coin.name}</span>
                <span className="crypto-symbol">{coin.symbol.toUpperCase()}</span>
              </div>

              {sparkData.length > 0 && (
                <div className="sparkline">
                  <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={sparkData}>
                      <Line
                        type="monotone"
                        dataKey="p"
                        stroke={lineColor}
                        dot={false}
                        strokeWidth={1.5}
                      />
                      <YAxis domain={['auto', 'auto']} hide />
                      <XAxis dataKey="i" hide />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="crypto-prices">
                <span className="crypto-price">{formatPrice(coin.current_price)}</span>
                <span className={`crypto-change ${positive ? 'positive' : 'negative'}`}>
                  {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>

              <div className="crypto-market">
                <span className="crypto-mcap">{formatNumber(coin.market_cap)}</span>
                <span className="crypto-mcap-label">Market Cap</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
