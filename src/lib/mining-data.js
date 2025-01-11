'use client';

// Exchange symbol mappings
const EXCHANGE_SYMBOLS = {
  'BTC': { 
    coingecko: 'bitcoin',
    mexc: 'BTCUSDT',
    kucoin: 'BTC-USDT',
    gate: 'BTC_USDT'
  },
  'DOGE': { 
    coingecko: 'dogecoin',
    mexc: 'DOGEUSDT',
    kucoin: 'DOGE-USDT',
    gate: 'DOGE_USDT'
  },
  'BCH': { 
    coingecko: 'bitcoin-cash',
    mexc: 'BCHUSDT',
    kucoin: 'BCH-USDT',
    gate: 'BCH_USDT'
  },
  'LTC': { 
    coingecko: 'litecoin',
    mexc: 'LTCUSDT',
    kucoin: 'LTC-USDT',
    gate: 'LTC_USDT'
  },
  'ETC': { 
    coingecko: 'ethereum-classic',
    mexc: 'ETCUSDT',
    kucoin: 'ETC-USDT',
    gate: 'ETC_USDT'
  },
  'XMR': { 
    coingecko: 'monero',
    mexc: 'XMRUSDT',
    kucoin: 'XMR-USDT',
    gate: 'XMR_USDT'
  },
  'KAS': { 
    coingecko: 'kaspa',
    mexc: 'KASUSDT',
    kucoin: 'KAS-USDT',
    gate: 'KAS_USDT'
  },
  'BSV': { 
    coingecko: 'bitcoin-sv',
    mexc: 'BSVUSDT',
    gate: 'BSV_USDT'
  },
  'CFX': { 
    coingecko: 'conflux',
    mexc: 'CFXUSDT',
    gate: 'CFX_USDT'
  },
  'CKB': { 
    coingecko: 'nervos-network',
    mexc: 'CKBUSDT',
    gate: 'CKB_USDT'
  },
  'DASH': { 
    coingecko: 'dash',
    mexc: 'DASHUSDT',
    kucoin: 'DASH-USDT',
    gate: 'DASH_USDT'
  },
  'VRSC': { 
    coingecko: 'verus-coin'
  },
  'ZEN': { 
    coingecko: 'horizen',
    mexc: 'ZENUSDT',
    kucoin: 'ZEN-USDT',
    gate: 'ZEN_USDT'
  },
  'SC': { 
    coingecko: 'siacoin',
    mexc: 'SCUSDT',
    gate: 'SC_USDT'
  },
  'XCH': { 
    coingecko: 'chia',
    mexc: 'XCHUSDT',
    gate: 'XCH_USDT'
  },
  'RVN': { 
    coingecko: 'ravencoin',
    mexc: 'RVNUSDT',
    kucoin: 'RVN-USDT',
    gate: 'RVN_USDT'
  },
  'KDA': { 
    coingecko: 'kadena',
    mexc: 'KDAUSDT',
    kucoin: 'KDA-USDT',
    gate: 'KDA_USDT'
  },
  'ZANO': { 
    coingecko: 'zano',
    mexc: 'ZANOUSDT'
  },
  'FLUX': { 
    coingecko: 'flux',
    mexc: 'FLUXUSDT',
    kucoin: 'FLUX-USDT',
    gate: 'FLUX_USDT'
  },
  'BTG': { 
    coingecko: 'bitcoin-gold',
    mexc: 'BTGUSDT',
    gate: 'BTG_USDT'
  },
  'CLORE': { 
    coingecko: 'clore',
    mexc: 'CLOREUSDT'
  },
  'OCTA': { 
    coingecko: 'octaspace',
    mexc: 'OCTAUSDT'
  },
  'FIRO': { 
    coingecko: 'firo',
    mexc: 'FIROUSDT',
    gate: 'FIRO_USDT'
  },
  'DNX': { 
    coingecko: 'dynex',
    mexc: 'DNXUSDT'
  },
  'IRON': { 
    coingecko: 'iron-fish',
    mexc: 'IRONUSDT'
  },
  'NEXA': {  // Changed from NEX to NEXA to match your COIN_METADATA
    coingecko: 'nexa',
    mexc: 'NEXAUSDT'
  },
  'AE': { 
    coingecko: 'aeternity',
    mexc: 'AEUSDT',
    gate: 'AE_USDT'
  },
  'XEL': { 
    coingecko: 'xelis',
    mexc: 'XELUSDT'
  },
  'XNA': { 
    coingecko: 'neurai',
    mexc: 'XNAUSDT'
  },
  'DERO': { 
    coingecko: 'dero',
    kucoin: 'DERO-USDT'
  },
  'RXD': { 
    coingecko: 'radiant',
    mexc: 'RXDUSDT'
  },
  'ZEPH': { 
    coingecko: 'zephyr',
    mexc: 'ZEPHUSDT'
  },
  'NEOX': { 
    coingecko: 'neoxa',
    mexc: 'NEOXUSDT'
  },
  'BLOCX': { 
    coingecko: 'blocx',
    mexc: 'BLOCXUSDT'
  },
  'RTM': { 
    coingecko: 'raptoreum',
    mexc: 'RTMUSDT'
  },
  'KLS': { 
    coingecko: 'karlsen',
    mexc: 'KLSUSDT'
  }
};

// API Fetching Functions
async function fetchCoinGeckoPrice(symbol) {
  try {
    const geckoId = EXCHANGE_SYMBOLS[symbol]?.coingecko;
    if (!geckoId) return 0;

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd`
    );
    const data = await response.json();
    return data[geckoId]?.usd || 0;
  } catch (error) {
    console.error(`CoinGecko API error for ${symbol}:`, error);
    return 0;
  }
}

async function fetchMEXCPrice(symbol) {
  try {
    const mexcSymbol = EXCHANGE_SYMBOLS[symbol]?.mexc;
    if (!mexcSymbol) return 0;

    const response = await fetch(
      `https://api.mexc.com/api/v3/ticker/price?symbol=${mexcSymbol}`
    );
    const data = await response.json();
    return parseFloat(data.price) || 0;
  } catch (error) {
    console.error(`MEXC API error for ${symbol}:`, error);
    return 0;
  }
}

async function fetchKuCoinPrice(symbol) {
  try {
    const kucoinSymbol = EXCHANGE_SYMBOLS[symbol]?.kucoin;
    if (!kucoinSymbol) return 0;

    const response = await fetch(
      `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${kucoinSymbol}`
    );
    const data = await response.json();
    return parseFloat(data.data?.price) || 0;
  } catch (error) {
    console.error(`KuCoin API error for ${symbol}:`, error);
    return 0;
  }
}

async function fetchGatePrice(symbol) {
  try {
    const gateSymbol = EXCHANGE_SYMBOLS[symbol]?.gate;
    if (!gateSymbol) return 0;

    const response = await fetch(
      `https://api.gateio.ws/api/v4/spot/tickers?currency_pair=${gateSymbol}`
    );
    const data = await response.json();
    return parseFloat(data[0]?.last) || 0;
  } catch (error) {
    console.error(`Gate.io API error for ${symbol}:`, error);
    return 0;
  }
}

// Price fetching with fallback
async function fetchPriceWithFallback(symbol) {
  let price = 0;
  let source = '';

  // Try CoinGecko first
  price = await fetchCoinGeckoPrice(symbol);
  if (price > 0) {
    source = 'CoinGecko';
    return { price, source };
  }

  // Try MEXC
  price = await fetchMEXCPrice(symbol);
  if (price > 0) {
    source = 'MEXC';
    return { price, source };
  }

  // Try KuCoin
  price = await fetchKuCoinPrice(symbol);
  if (price > 0) {
    source = 'KuCoin';
    return { price, source };
  }

  // Try Gate.io
  price = await fetchGatePrice(symbol);
  if (price > 0) {
    source = 'Gate.io';
    return { price, source };
  }

  // If all APIs fail
  return { price: 0, source: 'No Data Available' };
}
// Helper function to convert hashrate string to number
export const parseHashrate = (hashrateStr) => {
  const units = {
    'KH/s': 1e3,
    'MH/s': 1e6,
    'GH/s': 1e9,
    'TH/s': 1e12,
    'PH/s': 1e15,
    'EH/s': 1e18,
    'KGps': 1e3,
    'MGps': 1e6,
    'GGps': 1e9,
    'EiB': 1e18 // Simplified for Chia
  };

  for (const [unit, multiplier] of Object.entries(units)) {
    if (hashrateStr.includes(unit)) {
      const value = parseFloat(hashrateStr.split(' ')[0]);
      return value * multiplier;
    }
  }
  return parseFloat(hashrateStr); // fallback
};

// Map algorithms to recommended hardware and default units
export const ALGO_METADATA = {
  'SHA-256': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'Scrypt': { hardware: 'ASIC', defaultUnit: 'GH/s' },
  'Etchash': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'RandomX': { hardware: 'CPU', defaultUnit: 'KH/s' },
  'KHeavyHash': { hardware: 'ASIC', defaultUnit: 'GH/s' },
  'Octopus': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'Eaglesong': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'X11': { hardware: 'ASIC', defaultUnit: 'GH/s' },
  'VerusHash': { hardware: 'CPU', defaultUnit: 'MH/s' },
  'Equihash': { hardware: 'GPU', defaultUnit: 'Sol/s' },
  'Blake(2b-Sia)': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'Proof of Space': { hardware: 'HDD', defaultUnit: 'TB' },
  'KAWPOW': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'Blake(2s-Kadena)': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'ProgPowZ': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'Equihash(125,4)': { hardware: 'GPU', defaultUnit: 'Sol/s' },
  'Zhash': { hardware: 'GPU', defaultUnit: 'Sol/s' },
  'Ethash': { hardware: 'ASIC', defaultUnit: 'MH/s' },
  'FiroPoW': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'DynexSolve': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'FishHash': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'NexaPoW': { hardware: 'ASIC', defaultUnit: 'GH/s' },
  'CuckooCycle': { hardware: 'GPU', defaultUnit: 'G/s' },
  'XelisHash': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'AstroBWTv2': { hardware: 'CPU', defaultUnit: 'KH/s' },
  'Sha512256D': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'Autolykos2': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'GhostRider': { hardware: 'CPU', defaultUnit: 'KH/s' },
  'KarlsenHash': { hardware: 'GPU', defaultUnit: 'MH/s' }
};
// Coin metadata
export const COIN_METADATA = {
  'BTC': {
    name: 'Bitcoin',
    algorithm: 'SHA-256',
    networkHashrate: parseHashrate('826.68 EH/s'),
    blockReward: 3.125,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 450
  },
  'DOGE': {
    name: 'Dogecoin',
    algorithm: 'Scrypt',
    networkHashrate: parseHashrate('3.10 PH/s'),
    blockReward: 10000,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 14400000
  },
  'BCH': {
    name: 'Bitcoin Cash',
    algorithm: 'SHA-256',
    networkHashrate: parseHashrate('3.89 EH/s'),
    blockReward: 3.12647923,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 450.213
  },
  'LTC': {
    name: 'Litecoin',
    algorithm: 'Scrypt',
    networkHashrate: parseHashrate('1.83 PH/s'),
    blockReward: 6.25,
    blockTime: 150,
    blocksDay: 576,
    coinsMinedDay: 3600
  },
  'ETC': {
    name: 'Ethereum Classic',
    algorithm: 'Etchash',
    networkHashrate: parseHashrate('265.89 TH/s'),
    blockReward: 2.56,
    blockTime: 13,
    blocksDay: 6646,
    coinsMinedDay: 17013.76
  },
  'XMR': {
    name: 'Monero',
    algorithm: 'RandomX',
    networkHashrate: parseHashrate('3.74 GH/s'),
    blockReward: 0.6062231,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 436.481
  },
  'KAS': {
    name: 'Kaspa',
    algorithm: 'KHeavyHash',
    networkHashrate: parseHashrate('1.33 EH/s'),
    blockReward: 69.29565774,
    blockTime: 1,
    blocksDay: 86400,
    coinsMinedDay: 5987144.829
  },
  'BSV': {
    name: 'Bitcoin SV',
    algorithm: 'SHA-256',
    networkHashrate: parseHashrate('613.66 PH/s'),
    blockReward: 3.13306905,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 451.162
  },
  'CFX': {
    name: 'Conflux',
    algorithm: 'Octopus',
    networkHashrate: parseHashrate('4.16 TH/s'),
    blockReward: 1.0056307766,
    blockTime: 0.5,
    blocksDay: 172800,
    coinsMinedDay: 173772.998
  },
  'CKB': {
    name: 'Nervos Network',
    algorithm: 'Eaglesong',
    networkHashrate: parseHashrate('457.72 PH/s'),
    blockReward: 891.17482303,
    blockTime: 10,
    blocksDay: 8640,
    coinsMinedDay: 7699750.471
  },
  'DASH': {
    name: 'Dash',
    algorithm: 'X11',
    networkHashrate: parseHashrate('4.98 PH/s'),
    blockReward: 1.07234785,
    blockTime: 150,
    blocksDay: 576,
    coinsMinedDay: 617.672
  },
  'VRSC': {
    name: 'VerusCoin',
    algorithm: 'VerusHash',
    networkHashrate: parseHashrate('4.45 TH/s'),
    blockReward: 3,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 4320
  },
  'ZEN': {
    name: 'Horizen',
    algorithm: 'Equihash',
    networkHashrate: parseHashrate('3.10 GSol/s'),
    blockReward: 1.875,
    blockTime: 150,
    blocksDay: 576,
    coinsMinedDay: 1080
  },
  'SC': {
    name: 'Siacoin',
    algorithm: 'Blake(2b-Sia)',
    networkHashrate: parseHashrate('48.47 PH/s'),
    blockReward: 30000,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 8640000
  },
  'XCH': {
    name: 'Chia',
    algorithm: 'Proof of Space',
    networkHashrate: parseHashrate('18.19 EiB'),
    blockReward: 1,
    blockTime: 17,
    blocksDay: 5082,
    coinsMinedDay: 5082
  },
  'RVN': {
    name: 'Ravencoin',
    algorithm: 'KAWPOW',
    networkHashrate: parseHashrate('7.45 TH/s'),
    blockReward: 2500,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 3600000
  },
  'KDA': {
    name: 'Kadena',
    algorithm: 'Blake(2s-Kadena)',
    networkHashrate: parseHashrate('724.74 PH/s'),
    blockReward: 0.9661385,
    blockTime: 1.5,
    blocksDay: 57600,
    coinsMinedDay: 55649.578
  },
  'ZANO': {
    name: 'Zano',
    algorithm: 'ProgPowZ',
    networkHashrate: parseHashrate('761.96 GH/s'),
    blockReward: 1,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 1440
  },
  'FLUX': {
    name: 'Flux',
    algorithm: 'Equihash(125,4)',
    networkHashrate: parseHashrate('4.01 MSol/s'),
    blockReward: 18.75,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 13500
  },
  'BTG': {
    name: 'Bitcoin Gold',
    algorithm: 'Zhash',
    networkHashrate: parseHashrate('2.09 MSol/s'),
    blockReward: 3.125,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 450
  },
  'CLORE': {
    name: 'Clore',
    algorithm: 'KAWPOW',
    networkHashrate: parseHashrate('1.90 TH/s'),
    blockReward: 205,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 295200
  },
  'OCTA': {
    name: 'OctaSpace',
    algorithm: 'Ethash',
    networkHashrate: parseHashrate('7.12 TH/s'),
    blockReward: 1.2,
    blockTime: 15,
    blocksDay: 5760,
    coinsMinedDay: 6912
  },
  'FIRO': {
    name: 'Firo',
    algorithm: 'FiroPoW',
    networkHashrate: parseHashrate('20.65 GH/s'),
    blockReward: 0.3125,
    blockTime: 300,
    blocksDay: 288,
    coinsMinedDay: 90
  },
  'DNX': {
    name: 'Dynex',
    algorithm: 'DynexSolve',
    networkHashrate: parseHashrate('157.43 MH/s'),
    blockReward: 40.482669901,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 29147.522
  },
  'IRON': {
    name: 'Iron Fish',
    algorithm: 'FishHash',
    networkHashrate: parseHashrate('1.55 TH/s'),
    blockReward: 20,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 28800
  },
  'NEXA': {
    name: 'Nexa',
    algorithm: 'NexaPoW',
    networkHashrate: parseHashrate('5.38 TH/s'),
    blockReward: 10000000,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 7200000000
  },
  'AE': {
    name: 'Aeternity',
    algorithm: 'CuckooCycle',
    networkHashrate: parseHashrate('23.10 KGps'),
    blockReward: 43.65,
    blockTime: 180,
    blocksDay: 480,
    coinsMinedDay: 20952
  },
  'XEL': {
    name: 'Xelis',
    algorithm: 'XelisHash',
    networkHashrate: parseHashrate('4.33 GH/s'),
    blockReward: 1.1721,
    blockTime: 15,
    blocksDay: 5760,
    coinsMinedDay: 6751.296
  },
  'XNA': {
    name: 'Neurai',
    algorithm: 'KAWPOW',
    networkHashrate: parseHashrate('526.89 GH/s'),
    blockReward: 5000,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 7200000
  },
  'DERO': {
    name: 'Dero',
    algorithm: 'AstroBWTv2',
    networkHashrate: parseHashrate('160.00 MH/s'),
    blockReward: 0.615,
    blockTime: 18,
    blocksDay: 4800,
    coinsMinedDay: 2952
  },
  'RXD': {
    name: 'Radiant',
    algorithm: 'Sha512256D',
    networkHashrate: parseHashrate('3.17 PH/s'),
    blockReward: 25000,
    blockTime: 300,
    blocksDay: 288,
    coinsMinedDay: 7200000
  },
  'ZEPH': {
    name: 'Zephyr',
    algorithm: 'RandomX',
    networkHashrate: parseHashrate('321.94 MH/s'),
    blockReward: 7.0657048,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 5087.307
  },
  'NEOX': {
    name: 'Neoxa',
    algorithm: 'KAWPOW',
    networkHashrate: parseHashrate('264.38 GH/s'),
    blockReward: 2250,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 3240000
  },
  'BLOCX': {
    name: 'BLOCX',
    algorithm: 'Autolykos2',
    networkHashrate: parseHashrate('515.50 GH/s'),
    blockReward: 66,
    blockTime: 180,
    blocksDay: 480,
    coinsMinedDay: 31680
  },
  'RTM': {
    name: 'Raptoreum',
    algorithm: 'GhostRider',
    networkHashrate: parseHashrate('21.53 MH/s'),
    blockReward: 3592.5,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 2586600
  },
  'KLS': {
    name: 'Karlsen',
    algorithm: 'KarlsenHash',
    networkHashrate: parseHashrate('341.93 GH/s'),
    blockReward: 35.15879532,
    blockTime: 1,
    blocksDay: 86400,
    coinsMinedDay: 3037719.916
  }
};
// Updated fetchCoinData function with multi-API support
export async function fetchCoinData() {
  try {
    // Fetch prices for all coins using the fallback system
    const pricePromises = Object.keys(COIN_METADATA).map(async (symbol) => {
      const { price, source } = await fetchPriceWithFallback(symbol);
      return { symbol, price, source };
    });

    // Wait for all price fetches to complete
    const prices = await Promise.all(pricePromises);
    console.log('Fetched prices:', prices); // Debug log

    // Transform the metadata into the format needed for the UI
    const coins = Object.entries(COIN_METADATA).map(([symbol, data]) => {
      const priceInfo = prices.find(p => p.symbol === symbol) || { price: 0, source: 'No Data' };
      const dailyEmissionUSD = data.coinsMinedDay * priceInfo.price;

      return {
        symbol,
        name: data.name,
        algorithm: data.algorithm,
        hardware: ALGO_METADATA[data.algorithm]?.hardware || 'Various',
        defaultUnit: ALGO_METADATA[data.algorithm]?.defaultUnit || 'H/s',
        networkHashrate: data.networkHashrate,
        blockReward: data.blockReward,
        blockTime: data.blockTime,
        blocksDay: data.blocksDay,
        coinsMinedDay: data.coinsMinedDay,
        price: priceInfo.price,
        priceSource: priceInfo.source,
        dailyEmissionUSD: dailyEmissionUSD
      };
    });

    // Log the final processed data for debugging
    console.log('Processed data:', coins.length, 'coins');
    return coins;

  } catch (error) {
    console.error('Error in fetchCoinData:', error);
    // Return basic data without prices if all APIs fail
    return Object.entries(COIN_METADATA).map(([symbol, data]) => ({
      symbol,
      name: data.name,
      algorithm: data.algorithm,
      hardware: ALGO_METADATA[data.algorithm]?.hardware || 'Various',
      defaultUnit: ALGO_METADATA[data.algorithm]?.defaultUnit || 'H/s',
      networkHashrate: data.networkHashrate,
      blockReward: data.blockReward,
      blockTime: data.blockTime,
      blocksDay: data.blocksDay,
      coinsMinedDay: data.coinsMinedDay,
      price: 0,
      priceSource: 'Error',
      dailyEmissionUSD: 0
    }));
  }
}
