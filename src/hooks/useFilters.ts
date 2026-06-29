import { useState, useCallback } from 'react';
import type { FilterState } from '../types';

const DEFAULTS: FilterState = {
  githubUser: 'torvalds',
  weatherCity: 'São Paulo',
  cryptoCoins: ['bitcoin', 'ethereum', 'solana'],
  refreshInterval: 30_000,
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULTS);

  const setGithubUser = useCallback((user: string) => {
    setFilters(f => ({ ...f, githubUser: user }));
  }, []);

  const setWeatherCity = useCallback((city: string) => {
    setFilters(f => ({ ...f, weatherCity: city }));
  }, []);

  const setCryptoCoins = useCallback((coins: string[]) => {
    setFilters(f => ({ ...f, cryptoCoins: coins }));
  }, []);

  const setRefreshInterval = useCallback((ms: number) => {
    setFilters(f => ({ ...f, refreshInterval: ms }));
  }, []);

  return { filters, setGithubUser, setWeatherCity, setCryptoCoins, setRefreshInterval };
}
