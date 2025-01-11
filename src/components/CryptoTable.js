'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { ArrowUpDown, Cpu, HardDrive, MonitorSmartphone, Search, AlertCircle } from 'lucide-react';
import { fetchCoinData } from '../lib/mining-data';  // Make sure this path is correct

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'dailyEmissionUSD', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinData();
        console.log('Fetched coins:', data); // Debug log
        setCoins(data);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to fetch coin data. Retrying...');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getHardwareIcon = (type) => {
    switch (type?.toLowerCase()) {
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

  const filteredAndSortedCoins = coins
    .filter(coin => {
      const matchesSearch = searchTerm === '' || 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.algorithm.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesHardware = activeFilter === 'all' || 
        coin.hardware.toLowerCase().includes(activeFilter.toLowerCase());
      
      return matchesSearch && matchesHardware;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key] ?? 0;
      const bValue = b[sortConfig.key] ?? 0;
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const calculateTotals = () => {
    if (filteredAndSortedCoins.length === 0) return null;
    return {
      coins: filteredAndSortedCoins.length,
      totalDailyEmission: filteredAndSortedCoins.reduce((sum, coin) => sum + (coin.dailyEmissionUSD || 0), 0)
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-white p-4">
      <Card className="w-full border-[#00008B]/20">
        <CardContent className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-[#00008B]">Mining Coins Dashboard</h1>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search coins, algorithms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00008B]/50 w-full sm:w-64"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {['all', 'asic', 'gpu', 'cpu', 'hdd'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded capitalize ${
                      activeFilter === filter
                        ? 'bg-[#00008B] text-white'
                        : 'bg-gray-100 text-[#00008B] hover:bg-[#00008B]/10'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {totals && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-[#00008B]">
                Showing {totals.coins} coins | Total Daily Emission Value: ${totals.totalDailyEmission.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
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
                      { key: 'symbol', label: 'Symbol' },
                      { key: 'name', label: 'Name' },
                      { key: 'algorithm', label: 'Algorithm' },
                      { key: 'price', label: 'Price USD' },
                      { key: 'coinsMinedDay', label: 'Daily Coins' },
                      { key: 'dailyEmissionUSD', label: 'Daily Emission USD' },
                      { key: 'blockTime', label: 'Block Time' },
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
                  {filteredAndSortedCoins.map((coin) => (
                    <tr key={coin.symbol} className="hover:bg-[#00008B]/5">
                      <td className="px-4 py-3 text-sm font-medium">{coin.symbol}</td>
                      <td className="px-4 py-3 text-sm">{coin.name}</td>
                      <td className="px-4 py-3 text-sm">{coin.algorithm}</td>
                      <td className="px-4 py-3 text-sm">${coin.price?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 8
                      })}</td>
                      <td className="px-4 py-3 text-sm">{coin.coinsMinedDay?.toLocaleString(undefined, {
                        maximumFractionDigits: 8
                      })}</td>
                      <td className="px-4 py-3 text-sm">${coin.dailyEmissionUSD?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</td>
                      <td className="px-4 py-3 text-sm">{coin.blockTime}s</td>
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
