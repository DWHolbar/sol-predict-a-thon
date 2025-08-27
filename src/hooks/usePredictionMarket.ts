import { useState } from 'react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
import { useSolana } from './useSolana';
import { getMarketPDA, getUserPositionPDA, parseSOL } from '@/lib/solana';
import { useToast } from '@/hooks/use-toast';

export const usePredictionMarket = () => {
  const [loading, setLoading] = useState(false);
  const { program, publicKey } = useSolana();
  const { toast } = useToast();

  const createMarket = async (
    title: string,
    description: string,
    category: string,
    endTime: Date
  ) => {
    if (!program || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a market",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Generate a unique market ID
      const marketId = Math.random().toString(36).substring(2, 15);
      const [marketPDA] = getMarketPDA(marketId);

      const tx = await program.methods
        .initializeMarket(
          title,
          description,
          category,
          new BN(endTime.getTime() / 1000)
        )
        .accounts({
          market: marketPDA,
          creator: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast({
        title: "Market Created",
        description: `Market "${title}" created successfully`,
      });

      return { marketPDA, tx };
    } catch (error) {
      console.error('Error creating market:', error);
      toast({
        title: "Error",
        description: "Failed to create market",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const placeBet = async (
    marketPDA: PublicKey,
    amount: string,
    isYesBet: boolean
  ) => {
    if (!program || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to place a bet",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const [userPositionPDA] = getUserPositionPDA(publicKey, marketPDA);
      const betAmount = parseSOL(amount);

      const tx = await program.methods
        .placeBet(new BN(betAmount), isYesBet)
        .accounts({
          market: marketPDA,
          userPosition: userPositionPDA,
          user: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast({
        title: "Bet Placed",
        description: `${isYesBet ? 'YES' : 'NO'} bet of ${amount} SOL placed successfully`,
      });

      return tx;
    } catch (error) {
      console.error('Error placing bet:', error);
      toast({
        title: "Error",
        description: "Failed to place bet",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resolveMarket = async (marketPDA: PublicKey, outcome: boolean) => {
    if (!program || !publicKey) return;

    try {
      setLoading(true);
      
      const tx = await program.methods
        .resolveMarket(outcome)
        .accounts({
          market: marketPDA,
          creator: publicKey,
        })
        .rpc();

      toast({
        title: "Market Resolved",
        description: `Market resolved with outcome: ${outcome ? 'YES' : 'NO'}`,
      });

      return tx;
    } catch (error) {
      console.error('Error resolving market:', error);
      toast({
        title: "Error",
        description: "Failed to resolve market",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    createMarket,
    placeBet,
    resolveMarket,
    loading,
  };
};