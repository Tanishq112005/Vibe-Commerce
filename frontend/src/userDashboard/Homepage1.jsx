// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, setFilters, clearFilters } from '../store/slice/itemsSlice';
import { fetchCartItems, addToCart } from '../store/slice/cartSlice';
import Header from '../components/common/Header';
import ProductCard from '../components/items/ProductCard';
import Filters from '../components/items/Filters';
import './Homepage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, filteredItems, loading, error, filters } = useSelector((state) => state.items);
  const { totalItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
    if (isAuthenticated) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, isAuthenticated]);

  const handleAddToCart = async (item) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      // ✅ Pass the whole 'item' object, not just 'item.id'
      await dispatch(addToCart({ item: item, quantity: 1 })).unwrap();
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  // Check if we have any items to display
  const hasItems = items && items.length > 0;
  const hasFilteredItems = filteredItems && filteredItems.length > 0;

  return (
    <div className="home-page">
      <Header />
      
      <div className="home-container">
        {/* Mobile Filter Toggle */}
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? '✕ Close Filters' : '☰ Show Filters'}
        </button>

        <div className="home-content">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'filters-open' : ''}`}>
            <Filters 
              filters={filters}
              onFilterChange={(newFilters) => dispatch(setFilters(newFilters))}
              onClearFilters={() => dispatch(clearFilters())}
            />
          </aside>

          {/* Main Content */}
          <main className="products-main">
            <div className="products-header">
              <h1>All Products</h1>
              <div className="products-info">
                <span className="product-count">
                  {hasItems ? `${filteredItems.length} products found` : 'Loading products...'}
                </span>
                {totalItems > 0 && (
                  <button className="view-cart-btn" onClick={handleViewCart}>
                    🛒 View Cart ({totalItems})
                  </button>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <div className="error-icon">⚠️</div>
                <div className="error-text">
                  <strong>Unable to load products</strong>
                  <p>Please check your connection and try again.</p>
                </div>
                <button 
                  className="retry-btn"
                  onClick={() => dispatch(fetchItems())}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && hasFilteredItems && (
              <div className="products-grid">
                {filteredItems.map(item => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* No Products State */}
            {!loading && !error && hasItems && !hasFilteredItems && (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h2>No products match your search</h2>
                <p>Try adjusting your filters or search terms</p>
                <button 
                  className="clear-filters-btn"
                  onClick={() => dispatch(clearFilters())}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* No Items in Database */}
            {!loading && !error && !hasItems && (
              <div className="no-products">
                <div className="no-products-icon">📦</div>
                <h2>No Products Available</h2>
                <p>There are currently no products in the store. Please check back later.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;