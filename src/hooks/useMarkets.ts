import { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useSolana } from './useSolana';
import { Market } from '@/lib/solana';
import { useToast } from '@/hooks/use-toast';

export const useMarkets = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(false);
  const { program } = useSolana();
  const { toast } = useToast();

  const fetchMarkets = async () => {
    if (!program) return;

    try {
      setLoading(true);
      // Fetch all market accounts
      const marketAccounts = await program.account.market.all();
      
      const marketsData = marketAccounts.map((account) => ({
        id: account.publicKey,
        ...account.account,
      })) as Market[];

      setMarkets(marketsData);
    } catch (error) {
      console.error('Error fetching markets:', error);
      toast({
        title: "Error",
        description: "Failed to fetch markets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, [program]);

  return {
    markets,
    loading,
    refetch: fetchMarkets,
  };
};