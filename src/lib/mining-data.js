'use client';

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
  'KHeavyHash': { hardware: 'GPU/ASIC', defaultUnit: 'GH/s' },
  'Octopus': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'Eaglesong': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'X11': { hardware: 'ASIC', defaultUnit: 'GH/s' },
  'VerusHash': { hardware: 'CPU/GPU', defaultUnit: 'MH/s' },
  'Equihash': { hardware: 'GPU', defaultUnit: 'Sol/s' },
  'Blake(2b-Sia)': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'Proof of Space': { hardware: 'HDD', defaultUnit: 'TB' },
  'KAWPOW': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'Blake(2s-Kadena)': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'ProgPowZ': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'Equihash(125,4)': { hardware: 'GPU', defaultUnit: 'Sol/s' },
  'Zhash': { hardware: 'GPU', defaultUnit: 'Sol/s' },
  'Ethash': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'FiroPoW': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'DynexSolve': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'FishHash': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'NexaPoW': { hardware: 'GPU', defaultUnit: 'GH/s' },
  'CuckooCycle': { hardware: 'GPU', defaultUnit: 'G/s' },
  'XelisHash': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'AstroBWTv2': { hardware: 'CPU', defaultUnit: 'KH/s' },
  'Sha512256D': { hardware: 'ASIC', defaultUnit: 'TH/s' },
  'Autolykos2': { hardware: 'GPU', defaultUnit: 'MH/s' },
  'GhostRider': { hardware: 'CPU', defaultUnit: 'KH/s' },
  'KarlsenHash': { hardware: 'GPU', defaultUnit: 'MH/s' }
};

export const COIN_METADATA = {
  'BTC': {
    name: 'Bitcoin',
    algorithm: 'SHA-256',
    networkHashrate: parseHashrate('826.68 EH/s'),
    blockReward: 3.125,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 450,
    dailyEmission: 42028200
  },
  'DOGE': {
    name: 'Dogecoin',
    algorithm: 'Scrypt',
    networkHashrate: parseHashrate('3.10 PH/s'),
    blockReward: 10000,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 14400000,
    dailyEmission: 4692254
  },
  'BCH': {
    name: 'Bitcoin Cash',
    algorithm: 'SHA-256',
    networkHashrate: parseHashrate('3.89 EH/s'),
    blockReward: 3.12647923,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 450.213,
    dailyEmission: 197450
  },
  'LTC': {
    name: 'Litecoin',
    algorithm: 'Scrypt',
    networkHashrate: parseHashrate('1.83 PH/s'),
    blockReward: 6.25,
    blockTime: 150,
    blocksDay: 576,
    coinsMinedDay: 3600,
    dailyEmission: 375948
  },
  'ETC': {
    name: 'Ethereum Classic',
    algorithm: 'Etchash',
    networkHashrate: parseHashrate('265.89 TH/s'),
    blockReward: 2.56,
    blockTime: 13,
    blocksDay: 6646,
    coinsMinedDay: 17013.76,
    dailyEmission: 428406
  },
  'XMR': {
    name: 'Monero',
    algorithm: 'RandomX',
    networkHashrate: parseHashrate('3.74 GH/s'),
    blockReward: 0.6062231,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 436.481,
    dailyEmission: 85817
  },
  'KAS': {
    name: 'Kaspa',
    algorithm: 'KHeavyHash',
    networkHashrate: parseHashrate('1.33 EH/s'),
    blockReward: 69.29565774,
    blockTime: 1,
    blocksDay: 86400,
    coinsMinedDay: 5987144.829,
    dailyEmission: 675829
  },
  'BSV': {
    name: 'Bitcoin SV',
    algorithm: 'SHA-256',
    networkHashrate: parseHashrate('613.66 PH/s'),
    blockReward: 3.13306905,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 451.162,
    dailyEmission: 26068
  },
  'CFX': {
    name: 'Conflux',
    algorithm: 'Octopus',
    networkHashrate: parseHashrate('4.16 TH/s'),
    blockReward: 1.0056307766,
    blockTime: 0.5,
    blocksDay: 172800,
    coinsMinedDay: 173772.998,
    dailyEmission: 25323
  },
  'CKB': {
    name: 'Nervos Network',
    algorithm: 'Eaglesong',
    networkHashrate: parseHashrate('457.72 PH/s'),
    blockReward: 891.17482303,
    blockTime: 10,
    blocksDay: 8640,
    coinsMinedDay: 7699750.471,
    dailyEmission: 84334
  },
  'DASH': {
    name: 'Dash',
    algorithm: 'X11',
    networkHashrate: parseHashrate('4.98 PH/s'),
    blockReward: 1.07234785,
    blockTime: 150,
    blocksDay: 576,
    coinsMinedDay: 617.672,
    dailyEmission: 22421
  },
  'VRSC': {
    name: 'VerusCoin',
    algorithm: 'VerusHash',
    networkHashrate: parseHashrate('4.45 TH/s'),
    blockReward: 3,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 4320,
    dailyEmission: 20822
  },
  'ZEN': {
    name: 'Horizen',
    algorithm: 'Equihash',
    networkHashrate: parseHashrate('3.10 GSol/s'),
    blockReward: 1.875,
    blockTime: 150,
    blocksDay: 576,
    coinsMinedDay: 1080,
    dailyEmission: 25801
  },
  'SC': {
    name: 'Siacoin',
    algorithm: 'Blake(2b-Sia)',
    networkHashrate: parseHashrate('48.47 PH/s'),
    blockReward: 30000,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 8640000,
    dailyEmission: 53782
  }
  
 'XCH': {
    name: 'Chia',
    algorithm: 'Proof of Space',
    networkHashrate: parseHashrate('18.19 EiB'),
    blockReward: 1,
    blockTime: 17,
    blocksDay: 5082,
    coinsMinedDay: 5082,
    dailyEmission: 110432
  },
  'RVN': {
    name: 'Ravencoin',
    algorithm: 'KAWPOW',
    networkHashrate: parseHashrate('7.45 TH/s'),
    blockReward: 2500,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 3600000,
    dailyEmission: 69988
  },
  'KDA': {
    name: 'Kadena',
    algorithm: 'Blake(2s-Kadena)',
    networkHashrate: parseHashrate('724.74 PH/s'),
    blockReward: 0.9661385,
    blockTime: 1.5,
    blocksDay: 57600,
    coinsMinedDay: 55649.578,
    dailyEmission: 45519
  },
  'ZANO': {
    name: 'Zano',
    algorithm: 'ProgPowZ',
    networkHashrate: parseHashrate('761.96 GH/s'),
    blockReward: 1,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 1440,
    dailyEmission: 22738
  },
  'FLUX': {
    name: 'Flux',
    algorithm: 'Equihash(125,4)',
    networkHashrate: parseHashrate('4.01 MSol/s'),
    blockReward: 18.75,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 13500,
    dailyEmission: 7783
  },
  'BTG': {
    name: 'Bitcoin Gold',
    algorithm: 'Zhash',
    networkHashrate: parseHashrate('2.09 MSol/s'),
    blockReward: 3.125,
    blockTime: 600,
    blocksDay: 144,
    coinsMinedDay: 450,
    dailyEmission: 5567
  },
  'CLORE': {
    name: 'Clore',
    algorithm: 'KAWPOW',
    networkHashrate: parseHashrate('1.90 TH/s'),
    blockReward: 205,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 295200,
    dailyEmission: 22813
  },
  'OCTA': {
    name: 'OctaSpace',
    algorithm: 'Ethash',
    networkHashrate: parseHashrate('7.12 TH/s'),
    blockReward: 1.2,
    blockTime: 15,
    blocksDay: 5760,
    coinsMinedDay: 6912,
    dailyEmission: 6947
  },
  'FIRO': {
    name: 'Firo',
    algorithm: 'FiroPoW',
    networkHashrate: parseHashrate('20.65 GH/s'),
    blockReward: 0.3125,
    blockTime: 300,
    blocksDay: 288,
    coinsMinedDay: 90,
    dailyEmission: 183
  },
  'DNX': {
    name: 'Dynex',
    algorithm: 'DynexSolve',
    networkHashrate: parseHashrate('157.43 MH/s'),
    blockReward: 40.482669901,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 29147.522,
    dailyEmission: 5841
  },
  'IRON': {
    name: 'Iron Fish',
    algorithm: 'FishHash',
    networkHashrate: parseHashrate('1.55 TH/s'),
    blockReward: 20,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 28800,
    dailyEmission: 10385
  }
'NEX': {
    name: 'Nexa',
    algorithm: 'NexaPoW',
    networkHashrate: parseHashrate('5.38 TH/s'),
    blockReward: 10000000,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 7200000000,
    dailyEmission: 13968
  },
  'AE': {
    name: 'Aeternity',
    algorithm: 'CuckooCycle',
    networkHashrate: parseHashrate('23.10 KGps'),
    blockReward: 43.65,
    blockTime: 180,
    blocksDay: 480,
    coinsMinedDay: 20952,
    dailyEmission: 654
  },
  'XEL': {
    name: 'Xelis',
    algorithm: 'XelisHash',
    networkHashrate: parseHashrate('4.33 GH/s'),
    blockReward: 1.1721,
    blockTime: 15,
    blocksDay: 5760,
    coinsMinedDay: 6751.296,
    dailyEmission: 40373
  },
  'XNA': {
    name: 'Neurai',
    algorithm: 'KAWPOW',
    networkHashrate: parseHashrate('526.89 GH/s'),
    blockReward: 5000,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 7200000,
    dailyEmission: 5718
  },
  'DERO': {
    name: 'Dero',
    algorithm: 'AstroBWTv2',
    networkHashrate: parseHashrate('160.00 MH/s'),
    blockReward: 0.615,
    blockTime: 18,
    blocksDay: 4800,
    coinsMinedDay: 2952,
    dailyEmission: 2150
  },
  'RXD': {
    name: 'Radiant',
    algorithm: 'Sha512256D',
    networkHashrate: parseHashrate('3.17 PH/s'),
    blockReward: 25000,
    blockTime: 300,
    blocksDay: 288,
    coinsMinedDay: 7200000,
    dailyEmission: 5217
  },
  'ZEPH': {
    name: 'Zephyr',
    algorithm: 'RandomX',
    networkHashrate: parseHashrate('321.94 MH/s'),
    blockReward: 7.0657048,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 5087.307,
    dailyEmission: 6563
  },
  'NEOX': {
    name: 'Neoxa',
    algorithm: 'KAWPOW',
    networkHashrate: parseHashrate('264.38 GH/s'),
    blockReward: 2250,
    blockTime: 60,
    blocksDay: 1440,
    coinsMinedDay: 3240000,
    dailyEmission: 2232
  },
  'BLOCX': {
    name: 'BLOCX',
    algorithm: 'Autolykos2',
    networkHashrate: parseHashrate('515.50 GH/s'),
    blockReward: 66,
    blockTime: 180,
    blocksDay: 480,
    coinsMinedDay: 31680,
    dailyEmission: 746
  },
  'RTM': {
    name: 'Raptoreum',
    algorithm: 'GhostRider',
    networkHashrate: parseHashrate('21.53 MH/s'),
    blockReward: 3592.5,
    blockTime: 120,
    blocksDay: 720,
    coinsMinedDay: 2586600,
    dailyEmission: 1261
  },
  'KLS': {
    name: 'Karlsen',
    algorithm: 'KarlsenHash',
    networkHashrate: parseHashrate('341.93 GH/s'),
    blockReward: 35.15879532,
    blockTime: 1,
    blocksDay: 86400,
    coinsMinedDay: 3037719.916,
    dailyEmission: 2227
  }
};

export function fetchCoinData() {
  // Transform the metadata into the format needed for the UI
  const coins = Object.entries(COIN_METADATA).map(([symbol, data]) => {
    const algoData = ALGO_METADATA[data.algorithm] || { 
      hardware: 'Various', 
      defaultUnit: 'H/s' 
    };

    return {
      symbol,
      name: data.name,
      algorithm: data.algorithm,
      hardware: algoData.hardware,
      defaultUnit: algoData.defaultUnit,
      networkHashrate: data.networkHashrate,
      blockReward: data.blockReward,
      blockTime: data.blockTime,
      blocksDay: data.blocksDay,
      coinsMinedDay: data.coinsMinedDay,
      dailyEmission: data.dailyEmission,
    };
  });

  return Promise.resolve(coins);
}
