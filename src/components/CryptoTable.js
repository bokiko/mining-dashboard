'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { ArrowUpDown, Cpu, HardDrive, MonitorSmartphone, Search, AlertCircle } from 'lucide-react';
import { fetchCoinData } from '../lib/mining-data';

const CryptoTable = () => {
  // ... keep all the existing state and functions ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <Card className="w-full bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border-0">
        <CardContent className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl flex items-center gap-3 text-red-600 border border-red-200">
              <AlertCircle size={24} />
              <span className="font-medium">{error}</span>
            </div>
          )}

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

          {totals && (
            <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-blue-600">Total Coins</span>
                  <span className="text-2xl font-bold text-blue-900">{totals.coins}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-blue-600">Daily Emission Value</span>
                  <span className="text-2xl font-bold text-blue-900">
                    ${totals.totalDailyEmission.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full bg-white">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
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
                        className="px-4 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={() => handleSort(column.key)}
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          <ArrowUpDown className="h-4 w-4 text-gray-400" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAndSortedCoins.map((coin) => (
                    <tr key={coin.symbol} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-semibold text-blue-900">{coin.symbol}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{coin.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                          {coin.algorithm}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 font-medium">
                        ${coin.price?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 8
                        })}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{coin.coinsMinedDay?.toLocaleString(undefined, {
                        maximumFractionDigits: 8
                      })}</td>
                      <td className="px-4 py-4 text-sm font-medium text-green-600">
                        ${coin.dailyEmissionUSD?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{coin.blockTime}s</td>
                      <td className="px-4 py-4 text-sm">
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium w-fit">
                          {getHardwareIcon(coin.hardware)}
                          {coin.hardware}
                        </span>
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
