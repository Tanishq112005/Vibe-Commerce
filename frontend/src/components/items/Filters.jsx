// src/components/items/Filters.jsx
import React from 'react';
import './Filters.css';

const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  // Predefined categories
  const categories = [
    'Clothing',
    'Smartphones',
    'Electronics',
    'Fruits',
    'Vegetables',
    'Laptops'
  ];

  const handleCategoryChange = (category) => {
    onFilterChange({ category });
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    onFilterChange({ 
      minPrice: minPrice ? parseInt(minPrice) : 0, 
      maxPrice: maxPrice ? parseInt(maxPrice) : 10000 
    });
  };

  const handleSearchChange = (searchQuery) => {
    onFilterChange({ searchQuery });
  };

  const quickPriceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹2000', min: 500, max: 2000 },
    { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
    { label: '₹5000+', min: 5000, max: 10000 }
  ];

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="clear-filters" onClick={onClearFilters}>
          Clear All
        </button>
      </div>

      {/* Search Filter */}
      <div className="filter-group">
        <label className="filter-label">Search Products</label>
        <input
          type="text"
          placeholder="Search by product name..."
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <label className="filter-label">Categories</label>
        <div className="category-list">
          <button
            className={`category-btn ${!filters.category ? 'active' : ''}`}
            onClick={() => handleCategoryChange('')}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${filters.category === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <label className="filter-label">Price Range</label>
        <div className="price-range-container">
          <div className="price-inputs">
            <div className="price-input-group">
              <span className="price-label">Min</span>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange(e.target.value, filters.maxPrice)}
                className="price-input"
                min="0"
                placeholder="0"
              />
            </div>
            <div className="price-separator">-</div>
            <div className="price-input-group">
              <span className="price-label">Max</span>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange(filters.minPrice, e.target.value)}
                className="price-input"
                min="0"
                placeholder="10000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Price Filters */}
      <div className="filter-group">
        <label className="filter-label">Quick Filters</label>
        <div className="quick-price-filters">
          {quickPriceRanges.map((range, index) => (
            <button
              key={index}
              className="price-filter-btn"
              onClick={() => handlePriceChange(range.min, range.max)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;