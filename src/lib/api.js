'use client';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Mining algorithm mappings for top coins
const COIN_ALGORITHMS = {
  'bitcoin': 'SHA-256',
  'ethereum-classic': 'Ethash',
  'dogecoin': 'Scrypt',
  'litecoin': 'Scrypt',
  'monero': 'RandomX',
  'ravencoin': 'KAWPOW',
  'ergo': 'Autolykos v2',
  'flux': 'ZelHash',
  'bitcoin-gold': 'Zhash',
  'kaspa': 'Heavy Hash',
};

// Hardware type mappings
const COIN_HARDWARE = {
  'bitcoin': 'ASIC',
  'ethereum-classic': 'GPU',
  'dogecoin': 'ASIC',
  'litecoin': 'ASIC',
  'monero': 'CPU',
  'ravencoin': 'GPU',
  'ergo': 'GPU',
  'flux': 'GPU',
  'bitcoin-gold': 'GPU',
  'kaspa': 'GPU',
};

// Estimated daily coins generated
const DAILY_COINS = {
  'bitcoin': 900,
  'ethereum-classic': 14400,
  'dogecoin': 14400000,
  'litecoin': 7200,
  'monero': 720,
  'ravencoin': 72000,
  'ergo': 86400,
  'flux': 43200,
  'bitcoin-gold': 2880,
  'kaspa': 144000,
};

// Pool counts (you can update these with real data)
const ACTIVE_POOLS = {
  'bitcoin': 42,
  'ethereum-classic': 25,
  'dogecoin': 18,
  'litecoin': 28,
  'monero': 15,
  'ravencoin': 20,
  'ergo': 12,
  'flux': 10,
  'bitcoin-gold': 8,
  'kaspa': 15,
};

export async function fetchCoinData() {
  try {
    // Get top 100 coins by market cap
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    // Filter only POW coins we know about and format data
    const powCoins = data
      .filter(coin => COIN_ALGORITHMS[coin.id])
      .map(coin => {
        const dailyCoins = DAILY_COINS[coin.id] || 0;
        return {
          rank: coin.market_cap_rank,
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          marketCap: coin.market_cap,
          algorithm: COIN_ALGORITHMS[coin.id],
          hardware: COIN_HARDWARE[coin.id],
          dailyCoins: dailyCoins,
          dailyEmissionsValue: dailyCoins * coin.current_price,
          image: coin.image,
          priceChange24h: coin.price_change_percentage_24h,
          activePools: ACTIVE_POOLS[coin.id] || 0,
        };
      });

    // Calculate emissions percentages
    const totalEmissions = powCoins.reduce((sum, coin) => sum + coin.dailyEmissionsValue, 0);
    const btcEmissions = powCoins.find(coin => coin.symbol === 'BTC')?.dailyEmissionsValue || 0;
    const totalExBTC = totalEmissions - btcEmissions;

    return powCoins.map(coin => ({
      ...coin,
      emissionsPercentage: ((coin.dailyEmissionsValue / totalEmissions) * 100).toFixed(2),
      emissionsExBTC: coin.symbol === 'BTC' ? 0 : ((coin.dailyEmissionsValue / totalExBTC) * 100).toFixed(2)
    }));

  } catch (error) {
    console.error('Error fetching coin data:', error);
    return [];
  }
}
