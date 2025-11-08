// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { 
  fetchCartItems, 
  updateCartItem, 
  removeFromCart 
} from '../store/slice/cartSlice';
import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error, totalItems: cartTotalItems, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, user]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      // This relies on 'itemId' being a valid value from the 'items' array
      await dispatch(updateCartItem({ item_id: itemId, quantity: newQuantity })).unwrap();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // This relies on 'itemId' being a valid value from the 'items' array
      await dispatch(removeFromCart(itemId)).unwrap();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/home'); // <-- FIX 1: Was '/products'
  };

  // Use totals from Redux state
  const subtotal = totalAmount; 
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  const totalItems = cartTotalItems; // Use state-managed total

  if (!user) {
    return (
      <div className="cart-page">
        <Header />
        <div className="cart-container">
          <div className="login-required">
            <h2>Please Login</h2>
            <p>You need to be logged in to view your cart.</p>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          <span className="items-count">{totalItems} items</span>
      	</div>

    	 	{error && (
    	 	 	<div className="error-message">
    	 	 	 	<span>⚠️</span>
    	 	 	 	<div>
    	 	 	 	 	<strong>Error loading cart</strong>
    	 	 	 	 	<p>{error}</p>
    	 	 	 	</div>
    	 	 	 	{/* // <-- FIX 2: Correctly dispatch fetchCartItems */}
    	 	 	 	<button onClick={() => dispatch(fetchCartItems())}>Retry</button>
    	 	 	</div>
    	 	)}

    	 	{loading ? (
    	 	 	<div className="loading-container">
    	 	 	 	<div className="spinner"></div>
    	 	 	 	<p>Loading your cart...</p>
    	 	 	</div>
    	 	) : items.length > 0 ? (
    	 	 	<div className="cart-content">
    	 	 	 	<div className="cart-items">
    	 	 	 	 	{items.map(item => (
    	 	 	 	 	 	// If item.item_id is undefined here, it's because your API
    	 	 	 	 	 	// (and cartSlice) is not populating the state correctly.
    	 	 	 	 	 	<div key={item.cart_id || item.item_id} className="cart-item">
    	 	 	 	 	 	 	<div className="item-image">
    	 	 	 	 	 	 	 	<img 
    	 	 	 	 	 	 	 	 	src={item.image_url || 'https://via.placeholder.com/80x80?text=No+Image'} 
    	 	 	 	 	 	 	 	 	alt={item.name}
    	 	 	 	 	 	 	 	 	onError={(e) => {
    	 	 	 	 	 	 	 	 	 	e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
    	 	 	 	 	 	 	 	 	}}
    	 	 	 	 	 	 	 	/>
  	 	 	 	 	 	 	</div>
  	 	 	 	 	 	 	
  	 	 	 	 	 	 	<div className="item-details">
  	 	 	 	 	 	 	 	<h3 className="item-name">{item.name}</h3>
  	 	 	 	 	 	 	 	<p className="item-category">{item.category_type || 'General'}</p>
  	 	 	 	 	 	 	 	<p className="item-price">₹{item.price}</p>
  	 	 	 	 	 	 	</div>

  	 	 	 	 	 	 	<div className="quantity-controls">
  	 	 	 	 	 	 	 	<button
  	 	 	 	 	 	 	 	 	className="quantity-btn"
  	 	 	 	 	 	 	 	 	onClick={() => handleQuantityChange(item.item_id, item.quantity - 1)}
  	 	 	 	 	 	 	 	 	disabled={item.quantity <= 1}
  	 	 	 	 	 	 	 	>
  	 	 	 	 	 	 	 	 	−
  	 	 	 	 	 	 	 	</button>
  	 	 	 	 	 	 	 	<span className="quantity-display">{item.quantity}</span>
  	 	 	 	 	 	 	 	<button
  	 	 	 	 	 	 	 	 	className="quantity-btn"
  	 	 	 	 	 	 	 	 	onClick={() => handleQuantityChange(item.item_id, item.quantity + 1)}
  	 	 	 	 	 	 	 	>
  	 	 	 	 	 	 	 	 	+
  	 	 	 	 	 	 	 	</button>
  	 	 	 	 	 	 	</div>

  	 	 	 	 	 	 	<div className="item-total">
  	 	 	 	 	 	 	 	<span className="total-amount">₹{(item.price * item.quantity).toFixed(2)}</span>
  	 	 	 	 	 	 	</div>

  	 	 	 	 	 	 	<button
  	 	 	 	 	 	 	 	className="remove-btn"
  	 	 	 	 	 	 	 	onClick={() => handleRemoveItem(item.item_id)}
  	 	 	 	 	 	 	 	title="Remove item"
  	 	 	 	 	 	 	>
  	 	 	 	 	 	 	 	🗑️
  	 	 	 	 	 	 	</button>
  	 	 	 	 	 	</div>
  	 	 	 	 	))}
  	 	 	 	</div>

  	 	 	 	<div className="cart-summary">
  	 	 	 	 	<div className="summary-card">
  	 	 	 	 	 	<h3>Order Summary</h3>
  	 	 	 	 	 	
  	 	 	 	 	 	<div className="summary-row">
  	 	 	 	 	 	 	<span>Subtotal ({totalItems} items)</span>
  	 	 	 	 	 	 	<span>₹{subtotal.toFixed(2)}</span>
  	 	 	 	 	 	</div>
  	 	 	 	 	 	
  	 	 	 	 	 	<div className="summary-row">
  	 	 	 	 	 	 	<span>Tax (10%)</span>
  	 	 	 	 	 	 	<span>₹{tax.toFixed(2)}</span>
  	 	 	 	 	 	</div>
  	 	 	 	 	 	
  	 	 	 	 	 	<div className="summary-divider"></div>
  	 	 	 	 	 	
  	 	 	 	 	 	<div className="summary-row total">
  	 	 	 	 	 	 	<span>Total</span>
  	 	 	 	 	 	 	<span>₹{total.toFixed(2)}</span>
A   	 	 	 	 	</div>

  	 	 	 	 	 	<button
  	 	 	 	 	 	 	className="checkout-btn"
  	 	 	 	 	 	 	onClick={handleCheckout}
  	 	 	 	 	 	 	disabled={checkoutLoading || items.length === 0}
  	 	 	 	 	 	>
  	 	 	 	 	 	 	{checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
  	 	 	 	 	 	</button>

  	 	 	 	 	 	<button
  	 	 	 	 	 	 	className="continue-shopping-btn"
  	 	 	 	 	 	 	onClick={handleContinueShopping}
  	 	 	 	 	 	>
  	 	 	 	 	 	 	Continue Shopping
  	 	 	 	 	 	</button>
  	 	 	 	 	</div>
  	 	 	 	</div>
  	 	 	</div>
  	 	) : (
  	 	 	<div className="empty-cart">
  	 	 	 	<div className="empty-cart-icon">🛒</div>
  	 	 	 	<h2>Your cart is empty</h2>
  	 	 	 	<p>Add some items to your cart to see them here</p>
  	 	 	 	<button 
  	 	 	 	 	className="shop-now-btn"
  	 	 	 	 	onClick={handleContinueShopping}
  	 	 	 	>
  	 	 	 	 	Shop Now
  	 	 	 	</button>
  	 	 	</div>
  	 	)}
  	 </div>
  </div>
  );
};

export default CartPage;