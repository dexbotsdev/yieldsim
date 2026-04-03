# Yield Simulator

A simple, clean yield simulator for tokenized assets. Built with React (Vite)  .

## Features
- Input any investment amount.
- Select from a predefined list of tokenized assets (mSOL, USDC, USTB, stETH).
- See estimated yield for 30 days and 1 year.
- Clean UI using Tailwind v4 and Lucide icons.

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   You will need two terminal windows:

   **Terminal 1 (Backend):**
   ```bash
   npm run server
   ```

   **Terminal 2 (Frontend):**
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:5173`.

## Structure

- **`server/index.ts`**: A simple Express server that serves a mock list of assets and their APYs. This is where you would plug in real-time data from an Oracle or On-chain data in the future.
- **`src/App.tsx`**: The main frontend component. It handles the state for the user input, fetches assets from the backend, and performs the yield calculations.
- **`vite.config.ts`**: Configured with a proxy so that frontend calls to `/api` are automatically routed to the Express server during development.

## How to Extend

1. **Real Data Integration**:
   - In `server/index.ts`, replace the hardcoded `assets` array with a function that fetches data from a DeFi aggregator API (like DefiLlama) or directly from the blockchain (using `ethers.js` or `solana/web3.js`).

2. **Advanced Calculations**:
   - Add support for compound interest (daily, monthly, quarterly).
   - Include fee estimates (gas fees, protocol fees) for a more realistic net yield.

3. **Comparison Feature**:
   - Allow users to select multiple assets and see a side-by-side comparison of projected yields.

4. **Persistence**:
   - Add a backend database (like Supabase or PostgreSQL) to allow users to save their "portfolios" or simulations.


###Note : For ease of implementation I've removed the server part to deploy on vercel.