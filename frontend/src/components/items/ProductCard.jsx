// src/components/items/ProductCard.jsx
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ item, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(item);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={item.image_url || '/api/placeholder/300/300'} 
          alt={item.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        {item.number_of_product_available === 0 && (
          <div className="out-of-stock">Out of Stock</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-category">{item.category_type || 'Uncategorized'}</p>
        <div className="product-price">₹{item.price}</div>
        
        <div className="product-stock">
          {item.number_of_product_available > 0 ? (
            <span className="in-stock">
              {item.number_of_product_available} available
            </span>
          ) : (
            <span className="out-of-stock-text">Out of Stock</span>
          )}
        </div>
        
        <button 
          className={`add-to-cart-btn ${item.number_of_product_available === 0 ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={item.number_of_product_available === 0}
        >
          {item.number_of_product_available === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;