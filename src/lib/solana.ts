import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN, Idl } from '@project-serum/anchor';

// Constants
export const NETWORK = 'devnet'; // Change to 'mainnet-beta' for production
export const CONNECTION = new Connection(clusterApiUrl(NETWORK), 'confirmed');

// Replace with your deployed program ID
export const PROGRAM_ID = new PublicKey('11111111111111111111111111111111'); // Placeholder

// Program interfaces
export interface Market {
  id: PublicKey;
  creator: PublicKey;
  title: string;
  description: string;
  category: string;
  endTime: BN;
  yesTokenMint: PublicKey;
  noTokenMint: PublicKey;
  totalYesTokens: BN;
  totalNoTokens: BN;
  resolved: boolean;
  outcome: boolean | null;
  totalVolume: BN;
  bump: number;
}

export interface UserPosition {
  user: PublicKey;
  market: PublicKey;
  yesTokens: BN;
  noTokens: BN;
  bump: number;
}

// Mock IDL structure - replace with your actual IDL
export const PREDICTION_MARKET_IDL: Idl = {
  version: "0.1.0",
  name: "prediction_market",
  instructions: [
    {
      name: "initializeMarket",
      accounts: [
        { name: "market", isMut: true, isSigner: false },
        { name: "creator", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "category", type: "string" },
        { name: "endTime", type: "i64" },
      ],
    },
    {
      name: "placeBet",
      accounts: [
        { name: "market", isMut: true, isSigner: false },
        { name: "userPosition", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "amount", type: "u64" },
        { name: "isYesBet", type: "bool" },
      ],
    },
    {
      name: "resolveMarket",
      accounts: [
        { name: "market", isMut: true, isSigner: false },
        { name: "creator", isMut: false, isSigner: true },
      ],
      args: [
        { name: "outcome", type: "bool" },
      ],
    },
  ],
  accounts: [
    {
      name: "Market",
      type: {
        kind: "struct",
        fields: [
          { name: "creator", type: "publicKey" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "category", type: "string" },
          { name: "endTime", type: "i64" },
          { name: "totalYesTokens", type: "u64" },
          { name: "totalNoTokens", type: "u64" },
          { name: "resolved", type: "bool" },
          { name: "outcome", type: { option: "bool" } },
          { name: "totalVolume", type: "u64" },
          { name: "bump", type: "u8" },
        ],
      },
    },
    {
      name: "UserPosition",
      type: {
        kind: "struct",
        fields: [
          { name: "user", type: "publicKey" },
          { name: "market", type: "publicKey" },
          { name: "yesTokens", type: "u64" },
          { name: "noTokens", type: "u64" },
          { name: "bump", type: "u8" },
        ],
      },
    },
  ],
};

// Helper functions
export const getProgram = (provider: AnchorProvider) => {
  return new Program(PREDICTION_MARKET_IDL, PROGRAM_ID, provider);
};

export const getMarketPDA = (marketId: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("market"), Buffer.from(marketId)],
    PROGRAM_ID
  );
};

export const getUserPositionPDA = (user: PublicKey, market: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("user_position"), user.toBuffer(), market.toBuffer()],
    PROGRAM_ID
  );
};

// Format helpers
export const formatSOL = (amount: number) => {
  return (amount / web3.LAMPORTS_PER_SOL).toFixed(4);
};

export const parseSOL = (amount: string) => {
  return parseFloat(amount) * web3.LAMPORTS_PER_SOL;
};