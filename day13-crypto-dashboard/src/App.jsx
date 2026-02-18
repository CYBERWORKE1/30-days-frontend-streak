import { useState, useMemo } from "react";
import useCryptoData from "./hooks/useCryptoData";
import useDebounce from "./hooks/useDebounce";
import { formatNumber } from "./utils/formatNumber";
import CoinModal from "./components/CoinModal";
import Loader from "./components/Loader";
import "./index.css";

function App() {
  const { coins, loading, error } = useCryptoData();
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [coins, debouncedSearch]);

  return (
    <div className="page">
      
     {/* NAVBAR */}
    <nav className="navbar">
  <div className="logo">CRYPTO</div>
</nav>


      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Specialist Crypto Intelligence Platform</h1>
          <p>
            Professional market analytics and real-time insights for serious
            investors.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("dashboard")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Dashboard
          </button>
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section id="dashboard" className="dashboard-section">
        <div className="dashboard-header">
          <h2>Live Market Overview</h2>

          <input
            placeholder="Search cryptocurrency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <Loader />}
        {error && <p className="error">{error}</p>}

        <div className="table">
          <div className="table-header">
            <span>Coin</span>
            <span>Price</span>
            <span>24h %</span>
            <span>Market Cap</span>
          </div>

          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              className="table-row"
              onClick={() => setSelectedCoin(coin)}
            >
              <div className="coin-info">
                <img src={coin.image} alt={coin.name} />
                {coin.name}
              </div>
              <span>${formatNumber(coin.current_price)}</span>
              <span
                className={
                  coin.price_change_percentage_24h > 0
                    ? "positive"
                    : "negative"
                }
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
              <span>${formatNumber(coin.market_cap)}</span>
            </div>
          ))}
        </div>
      </section>

      {selectedCoin && (
        <CoinModal
          coin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </div>
  );
}

export default App;
