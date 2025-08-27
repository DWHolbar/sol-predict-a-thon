import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider } from '@project-serum/anchor';
import { useMemo } from 'react';
import { getProgram } from '@/lib/solana';

export const useSolana = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const provider = useMemo(() => {
    if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
      return null;
    }

    return new AnchorProvider(
      connection,
      {
        publicKey: wallet.publicKey,
        signTransaction: wallet.signTransaction,
        signAllTransactions: wallet.signAllTransactions,
      },
      { commitment: 'confirmed' }
    );
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return getProgram(provider);
  }, [provider]);

  return {
    connection,
    wallet,
    provider,
    program,
    connected: wallet.connected,
    publicKey: wallet.publicKey,
  };
};