import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, DollarSign, Calendar, Info } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  apy: number;
  description: string;
}

// Mock asset data
const mockAssets: Asset[] = [
  { id: '1', name: 'Staked SOL', symbol: 'mSOL', apy: 0.075, description: 'Marinade Staked SOL' },
  { id: '2', name: 'USDC-USD stable', symbol: 'USDC', apy: 0.052, description: 'USD Stablecoin' },
  { id: '3', name: 'Tokenized Treasury Bills', symbol: 'USTB', apy: 0.048, description: 'US Treasury Bills' },
  { id: '4', name: 'Yield Generating ETH', symbol: 'stETH', apy: 0.039, description: 'Lido Staked ETH' },
];

function App() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [selectedAssetId, setSelectedAssetId] = useState<string>(mockAssets[0]?.id || '');
  const [amount, setAmount] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(false);

  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === selectedAssetId),
    [assets, selectedAssetId]
  );

  const calculateYield = (timeInDays: number) => {
    if (!selectedAsset) return 0;
    // Simple interest calculation for demo
    // Final = Amount * (1 + (APY * days/365))
    return amount * selectedAsset.apy * (timeInDays / 365);
  };

  const yield30Days = calculateYield(30);
  const yield1Year = calculateYield(365);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin text-blue-600">
          <TrendingUp size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="text-blue-600" />
            Yield Simulator
          </h1>
          <p className="text-slate-600">Estimate your earnings on tokenized assets</p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Investment Amount (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter amount..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Asset
              </label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} ({asset.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedAsset && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
              <Info className="text-blue-600 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {selectedAsset.description} offering a fixed APY of{' '}
                  <span className="font-bold">{(selectedAsset.apy * 100).toFixed(2)}%</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* 30 Day Estimate */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">30-Day Estimate</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              ${yield30Days.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-slate-500 mt-1">Estimated yield</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Value</span>
                <span className="font-semibold">${(amount + yield30Days).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 1 Year Estimate */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">1-Year Estimate</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              ${yield1Year.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-slate-500 mt-1">Estimated yield</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Value</span>
                <span className="font-semibold text-blue-600">${(amount + yield1Year).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-slate-400 text-sm">
          <p>Note: Yield calculations are based on fixed APYs and do not account for compounding or fees.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
