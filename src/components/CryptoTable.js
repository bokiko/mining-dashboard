'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { ArrowUpDown, Cpu, HardDrive, MonitorSmartphone, Search, ArrowUp, ArrowDown, X } from 'lucide-react';
import { fetchCoinData } from '../lib/api';

const CoinDetailModal = ({ coin, onClose }) => {
  if (!coin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#00008B]">{coin.name} Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Market Information</h3>
              <p>Price: ${coin.price?.toLocaleString()}</p>
              <p>Market Cap: ${(coin.marketCap / 1e9).toFixed(2)}B</p>
              <p>24h Volume: ${(coin.volume24h / 1e6).toFixed(2)}M</p>
              <p className={`flex items-center ${coin.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                24h Change: {coin.priceChange24h?.toFixed(2)}%
                {coin.priceChange24h >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Mining Information</h3>
              <p>Algorithm: {coin.algorithm}</p>
              <p>Hardware: {coin.hardware}</p>
              <p>Daily Emissions: {coin.dailyCoins?.toLocaleString()} {coin.symbol}</p>
              <p>Active Mining Pools: {coin.activePools}</p>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Mining Profitability</h3>
            <p>Daily Emissions Value: ${(coin.dailyEmissionsValue)?.toLocaleString()}</p>
            <div className="mt-2 text-sm text-gray-600">
              <p>Note: Actual mining rewards may vary based on network hashrate, difficulty, and your mining setup.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);

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

  // Filter coins based on search term and hardware filter
  const filteredCoins = coins
    .filter(coin => {
      const matchesSearch = searchTerm === '' || 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || 
        coin.hardware.toLowerCase() === activeFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  const calculateTotals = () => {
    if (filteredCoins.length === 0) return null;
    return {
      dailyEmissionsValue: filteredCoins.reduce((sum, coin) => sum + coin.dailyEmissionsValue, 0),
      coins: filteredCoins.length
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-white p-4">
      <Card className="w-full border-[#00008B]/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-[#00008B]">Mining Coins Dashboard</h1>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search coins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00008B]/50 w-full sm:w-64"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
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
                      { key: 'priceChange24h', label: '24h Change' },
                      { key: 'marketCap', label: 'Market Cap' },
                      { key: 'algorithm', label: 'Algorithm' },
                      { key: 'dailyCoins', label: 'Daily Generated' },
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
                    <tr 
                      key={coin.symbol} 
                      className="hover:bg-[#00008B]/5 cursor-pointer"
                      onClick={() => setSelectedCoin(coin)}
                    >
                      <td className="px-4 py-3 text-sm">{coin.rank}</td>
                      <td className="px-4 py-3 text-sm font-medium">{coin.name}</td>
                      <td className="px-4 py-3 text-sm">{coin.symbol}</td>
                      <td className="px-4 py-3 text-sm">${coin.price?.toLocaleString()}</td>
                      <td className={`px-4 py-3 text-sm flex items-center ${coin.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {coin.priceChange24h?.toFixed(2)}%
                        {coin.priceChange24h >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      </td>
                      <td className="px-4 py-3 text-sm">${(coin.marketCap / 1e9).toFixed(2)}B</td>
                      <td className="px-4 py-3 text-sm">{coin.algorithm}</td>
                      <td className="px-4 py-3 text-sm">{coin.dailyCoins?.toLocaleString()}</td>
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

      {selectedCoin && (
        <CoinDetailModal
          coin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </div>
  );
};

export default CryptoTable;
