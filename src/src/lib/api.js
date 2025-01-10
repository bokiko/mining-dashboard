const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function fetchCoinData() {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false`
    );
    const data = await response.json();
    
    return data.map(coin => ({
      rank: coin.market_cap_rank,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      marketCap: coin.market_cap,
      algorithm: getMiningAlgorithm(coin.symbol),
      dailyCoins: calculateDailyCoins(coin.symbol),
      hardware: getHardwareType(coin.symbol),
      activePools: getActivePools(coin.symbol)
    }));
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return [];
  }
}

function getMiningAlgorithm(symbol) {
  const algorithms = {
    BTC: 'SHA-256',
    ETH: 'Ethash',
    LTC: 'Scrypt',
    XMR: 'RandomX',
  };
  return algorithms[symbol.toUpperCase()] || 'Various';
}

function getHardwareType(symbol) {
  const hardware = {
    BTC: 'ASIC',
    ETH: 'GPU',
    LTC: 'ASIC',
    XMR: 'CPU',
  };
  return hardware[symbol.toUpperCase()] || 'Various';
}

function calculateDailyCoins(symbol) {
  const emissions = {
    BTC: 900,
    ETH: 13000,
    LTC: 14400,
    XMR: 720,
  };
  return emissions[symbol.toUpperCase()] || 1000;
}

function getActivePools(symbol) {
  const pools = {
    BTC: 42,
    ETH: 35,
    LTC: 28,
    XMR: 15,
  };
  return pools[symbol.toUpperCase()] || Math.floor(Math.random() * 20) + 5;
}
