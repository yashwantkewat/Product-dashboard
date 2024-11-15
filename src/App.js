import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import products from "./data/Products.json";
import ProductList from "./components/Productlist";
import Cart from "./components/Cart";
import { FaShoppingCart } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import "./styles/index.css";
import Checkout from "./components/Checkout";
import logo from './assets/logo3.png'
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true)
  );

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleBuyNow = (product) => {
    setCart([product]);
  };

  return (
    <Router>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        {/* Navbar Section */}
        <nav className="navbar">
          <div className="navbar-container">
            <h1 className="header-title">
              <span className="title-highlight"> <img src={logo} className="img-logo" alt="no img" /> </span>
            </h1>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              &#9776;
            </button>

            {/* Navbar Links (For Desktop) */}
            <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
              <div className="navbar-search-filters">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <Filters
                  categories={[...new Set(products.map((p) => p.category))]}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>

              {/* Theme Toggle Button */}

              <div className="cart-container">
                <Link to="/cart">
                <span className="cart-count">{cart.length}</span>
                  <FaShoppingCart className="cart-icon" />
                </Link>
              </div>

              <button
                className="theme-toggle-btn"
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="icon sun" />
                    <span className="btn-text"></span>
                  </>
                ) : (
                  <>
                    <Moon className="icon moon" />
                    <span className="btn-text"></span>
                  </>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Routing for Different Pages */}
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                products={filteredProducts}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cart} />}
          />
           <Route
            path="/checkout"
            element={<Checkout />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
