'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { ArrowUpDown, Cpu, HardDrive, MonitorSmartphone } from 'lucide-react';

// Temporary data fetching function
const fetchCoinData = async () => {
  // Sample data for demonstration
  return [
    {
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 65432.10,
      marketCap: 1200000000000,
      algorithm: "SHA-256",
      dailyCoins: 900,
      dailyEmissions: "11.25 BTC",
      emissionsValue: 736111.125,
      emissionsPercentage: 45.2,
      emissionsExBTC: 0,
      activePools: 42,
      hardware: "ASIC",
    },
    {
      rank: 2,
      name: "Ethereum Classic",
      symbol: "ETC",
      price: 25.78,
      marketCap: 3000000000,
      algorithm: "Ethash",
      dailyCoins: 1440,
      dailyEmissions: "2.88 ETC",
      emissionsValue: 74.2464,
      emissionsPercentage: 8.5,
      emissionsExBTC: 15.5,
      activePools: 22,
      hardware: "GPU",
    },
    {
      rank: 3,
      name: "Monero",
      symbol: "XMR",
      price: 156.78,
      marketCap: 2800000000,
      algorithm: "RandomX",
      dailyCoins: 720,
      dailyEmissions: "0.6 XMR",
      emissionsValue: 94.068,
      emissionsPercentage: 5.2,
      emissionsExBTC: 9.5,
      activePools: 15,
      hardware: "CPU",
    }
  ];
};

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCoinData();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getHardwareIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'asic':
        return <Cpu className="inline-block mr-1" />;
      case 'gpu':
        return <MonitorSmartphone className="inline-block mr-1" />;
      case 'cpu':
        return <Cpu className="inline-block mr-1" />;
      case 'hdd':
        return <HardDrive className="inline-block mr-1" />;
      default:
        return <Cpu className="inline-block mr-1" />;
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedCoins = [...coins].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const filteredCoins = activeFilter === 'all' 
    ? sortedCoins 
    : sortedCoins.filter(coin => coin.hardware.toLowerCase() === activeFilter.toLowerCase());

  const calculateTotals = () => {
    if (filteredCoins.length === 0) return null;
    return {
      dailyEmissionsValue: filteredCoins.reduce((sum, coin) => sum + (coin.dailyCoins * coin.price), 0),
      coins: filteredCoins.length
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-white p-4">
      <Card className="w-full border-[#00008B]/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#00008B]">Mining Coins Dashboard</h1>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded ${activeFilter === 'all' ? 'bg-[#00008B] text-white' : 'bg-gray-100 text-[#00008B]'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('asic')}
                className={`px-4 py-2 rounded ${activeFilter === 'asic' ? 'bg-[#00008B] text-white' : 'bg-gray-100 text-[#00008B]'}`}
              >
                ASIC
              </button>
              <button 
                onClick={() => setActiveFilter('gpu')}
                className={`px-4 py-2 rounded ${activeFilter === 'gpu' ? 'bg-[#00008B] text-white' : 'bg-gray-100 text-[#00008B]'}`}
              >
                GPU
              </button>
              <button 
                onClick={() => setActiveFilter('cpu')}
                className={`px-4 py-2 rounded ${activeFilter === 'cpu' ? 'bg-[#00008B] text-white' : 'bg-gray-100 text-[#00008B]'}`}
              >
                CPU
              </button>
            </div>
          </div>

          {totals && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-[#00008B]">
                Showing {totals.coins} coins | Total Daily Emissions Value: ${totals.dailyEmissionsValue.toLocaleString()}
              </p>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-[#00008B]/5">
                  <tr>
                    {[
                      { key: 'rank', label: 'Rank' },
                      { key: 'name', label: 'Name' },
                      { key: 'symbol', label: 'Symbol' },
                      { key: 'price', label: 'Price' },
                      { key: 'marketCap', label: 'Market Cap' },
                      { key: 'algorithm', label: 'Algorithm' },
                      { key: 'dailyCoins', label: 'Daily Generated' },
                      { key: 'activePools', label: 'Active Pools' },
                      { key: 'hardware', label: 'Hardware' }
                    ].map((column) => (
                      <th 
                        key={column.key}
                        className="px-4 py-3 text-left text-sm font-medium text-[#00008B] cursor-pointer hover:bg-[#00008B]/10"
                        onClick={() => handleSort(column.key)}
                      >
                        <div className="flex items-center gap-1">
                          {column.label}
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#00008B]/10">
                  {filteredCoins.map((coin) => (
                    <tr key={coin.symbol} className="hover:bg-[#00008B]/5">
                      <td className="px-4 py-3 text-sm">{coin.rank}</td>
                      <td className="px-4 py-3 text-sm font-medium">{coin.name}</td>
                      <td className="px-4 py-3 text-sm">{coin.symbol}</td>
                      <td className="px-4 py-3 text-sm">${coin.price?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">${(coin.marketCap / 1e9).toFixed(2)}B</td>
                      <td className="px-4 py-3 text-sm">{coin.algorithm}</td>
                      <td className="px-4 py-3 text-sm">{coin.dailyCoins?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">{coin.activePools}</td>
                      <td className="px-4 py-3 text-sm">
                        {getHardwareIcon(coin.hardware)}
                        {coin.hardware}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoTable;
