Project Description
Deployed Frontend URL: https://sol-predict-a-thon.vercel.app/

Solana Program ID: prj_YI4OvqkzuHwLI2QcJtKX53WBpF0W

Project Overview
Description
This dApp is a decentralized prediction market built on Solana. Users can create markets on real-world or crypto events, place bets on outcomes (Yes/No), and earn rewards if their predictions are correct. The platform is non-custodial and leverages Solana's speed and low fees for seamless user experience.

Key Features
Create Prediction Markets: Any user can create a new market by specifying a title, description, category, and end time.

Place Bets: Users can place bets on either "Yes" or "No" outcomes for any open market.

Resolve Markets: Market creators can resolve markets after the end time, specifying the outcome.

Track Positions: Users can view their positions (Yes/No tokens) in each market.

How to Use the dApp
Connect Wallet: Connect your Solana wallet (e.g., Phantom) to the dApp.

Create a Market:

Navigate to the "Create Market" section. Enter the market details (title, description, category, end time). Submit the transaction. Place a Bet:

Select an open market. Choose "Yes" or "No" and enter the amount to bet. Confirm and sign the transaction. Resolve a Market:

If you are the market creator and the end time has passed, resolve the market by specifying the outcome. View Positions:

Check your open positions and potential rewards in each market.

Program Architecture
Overview The Solana program manages two main account types: Market and UserPosition.

Market: Stores market details, total bets, and resolution status. UserPosition: Tracks each user's Yes/No token holdings for a market.

PDA Usage
Market PDA:

Seeds: ["market", marketId] Purpose: Uniquely identifies each market account. UserPosition PDA:

Seeds: ["user_position", user, market] Purpose: Uniquely identifies each user's position in a market.

Program Instructions
initializeMarket: Creates a new market with the specified details.

placeBet: Allows a user to place a bet (Yes/No) on a market.

resolveMarket: Allows the market creator to resolve the market and set the outcome.

Account Structure
#[account] pub struct Market { pub creator: Pubkey, pub title: String, pub description: String, pub category: String, pub end_time: i64, pub total_yes_tokens: u64, pub total_no_tokens: u64, pub resolved: bool, pub outcome: Option, pub total_volume: u64, pub bump: u8, }

#[account] pub struct UserPosition { pub user: Pubkey, pub market: Pubkey, pub yes_tokens: u64, pub no_tokens: u64, pub bump: u8, }

Testing
Test Coverage
Here are some of the test coverage below-

Happy Path Tests: Creating a market with valid parameters. Placing Yes/No bets on an open market. Resolving a market after the end time. Users claiming rewards after market resolution.

Unhappy Path Tests: Placing a bet after market end time. Resolving a market before end time. Non-creator attempting to resolve a market. Placing a bet with insufficient funds.

Running Tests
anchor test

Additional Notes for Evaluators
The dApp uses Program Derived Addresses (PDAs) for secure, deterministic account management. All market and user position data is stored on-chain for transparency. The frontend is designed for ease of use and integrates directly with Solana wallets.
