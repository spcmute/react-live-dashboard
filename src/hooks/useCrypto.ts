import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { CryptoData } from '../types';

export function useCrypto(coins: string[], refreshInterval: number) {
  return useQuery<CryptoData[]>({
    queryKey: ['crypto', coins],
    queryFn: async () => {
      const ids = coins.join(',');
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets` +
        `?vs_currency=usd&ids=${ids}&order=market_cap_desc` +
        `&sparkline=true&price_change_percentage=24h`
      );
      return data;
    },
    enabled: coins.length > 0,
    refetchInterval: refreshInterval,
    staleTime: refreshInterval - 1000,
  });
}
