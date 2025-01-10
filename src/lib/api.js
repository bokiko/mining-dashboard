const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Mining algorithms and hardware for popular coins
const COIN_METADATA = {
  'bitcoin': { algorithm: 'SHA-256', hardware: 'ASIC', dailyEmissions: 900 },
  'ethereum-classic': { algorithm: 'ETHash', hardware: 'ASIC', dailyEmissions: 14400 },
  'monero': { algorithm: 'RandomX', hardware: 'CPU', dailyEmissions: 720 },
  'litecoin': { algorithm: 'Scrypt', hardware: 'ASIC', dailyEmissions: 14400 },
  'dogecoin': { algorithm: 'Scrypt', hardware: 'ASIC', dailyEmissions: 14400000 },
  'ravencoin': { algorithm: 'KAWPOW', hardware: 'GPU', dailyEmissions: 7200 },
  'ergo': { algorithm: 'Autolykos v2', hardware: 'GPU', dailyEmissions: 4320 },
  'bitcoin-gold': { algorithm: 'Zhash', hardware: 'ASIC', dailyEmissions: 900 },
  'vertcoin': { algorithm: 'Verthash', hardware: 'GPU', dailyEmissions: 14400 },
  'grin': { algorithm: 'C31', hardware: 'GPU', dailyEmissions: 60 },
  'zencash': { algorithm: 'Equihash', hardware: 'GPU', dailyEmissions: 1440 }
};

export async function fetchCoinData() {
  try {
    // Fetch top 50 coins by market cap
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }

    const data = await response.json();
    
    // Filter and transform the data
    const mineableCoins = data
      .filter(coin => COIN_METADATA[coin.id]) // Only include coins we have mining data for
      .map((coin, index) => {
        const metadata = COIN_METADATA[coin.id];
        const dailyEmissionsValue = metadata.dailyEmissions * coin.current_price;
        
        return {
          rank: index + 1,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          marketCap: coin.market_cap,
          volume24h: coin.total_volume,
          priceChange24h: coin.price_change_percentage_24h,
          algorithm: metadata.algorithm,
          dailyCoins: metadata.dailyEmissions,
          dailyEmissionsValue: dailyEmissionsValue,
          hardware: metadata.hardware,
          activePools: getActivePools(coin.symbol), // This would come from a mining pool API in production
          image: coin.image
        };
      });

    return mineableCoins;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return [];
  }
}

// Simulated function for active pools (in production, this would fetch from a mining pool API)
function getActivePools(symbol) {
  const poolCounts = {
    BTC: 42,
    ETH: 35,
    XMR: 15,
    LTC: 28,
    DOGE: 25,
    RVN: 18,
    ERG: 12,
    BTG: 10,
    VTC: 8,
    GRIN: 6,
    ZEN: 15
  };
  return poolCounts[symbol.toUpperCase()] || Math.floor(Math.random() * 20) + 5;
}
