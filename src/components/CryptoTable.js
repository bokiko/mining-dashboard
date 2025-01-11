'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { ArrowUpDown, Cpu, HardDrive, MonitorSmartphone, Search, AlertCircle } from 'lucide-react';
import { fetchCoinData } from '../lib/mining-data';

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // Changed from error to errorMessage
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'dailyEmissionUSD', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinData();
        setCoins(data);
        setErrorMessage(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setErrorMessage('Failed to fetch coin data. Will retry...');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Rest of your component remains the same until the return statement
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <Card className="w-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border-0">
        <CardContent className="p-6">
          {errorMessage && ( // Changed from error to errorMessage
            <div className="mb-6 p-4 bg-red-50 rounded-xl flex items-center gap-3 text-red-600 border border-red-200">
              <AlertCircle size={24} />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Rest of your component JSX remains the same */}
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                Mining Coins Dashboard
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search coins, algorithms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-72 transition-all"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {['all', 'asic', 'gpu', 'cpu', 'hdd'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      activeFilter === filter
                        ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ... rest of your existing JSX ... */}

        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoTable;
