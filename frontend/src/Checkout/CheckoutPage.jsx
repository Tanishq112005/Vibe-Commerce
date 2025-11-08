// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { placeOrder } from '../store/slice/orderSlice';
import { clearServerCart } from '../store/slice/cartSlice'; // <-- CORRECTED import
import './CheckoutPage.css';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading: orderLoading } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const orderItems = items.map(item => ({
        item_id: item.item_id,
        quantity: item.quantity
      }));

      const result = await dispatch(placeOrder({ items: orderItems })).unwrap();
      
      // Mock receipt data
      const receipt = {
        orderId: result.order?.id || `ORD-${Date.now()}`,
        items: items,
        total: total,
        timestamp: new Date().toISOString(),
        shippingAddress: formData,
        paymentMethod: formData.paymentMethod
      };

      setOrderDetails(receipt);
      setShowReceipt(true);
      
      // Clear cart on server after successful order
      dispatch(clearServerCart()); // <-- CORRECTED dispatch
      
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    navigate('/order-history');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (items.length === 0 && !showReceipt) {
    return (
      <div className="checkout-page">
        <Header />
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>No items in cart</h2>
            <p>Add some items to your cart before checkout</p>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <span className="step active">Cart</span>
            <span className="step active">Information</span>
            <span className="step">Payment</span>
            <span className="step">Confirmation</span>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Shipping Address</h3>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
s                 onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">PIN Code *</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
        _           />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Method</h3>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                    />
            s       <span>UPI</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={orderLoading}
              >
                {orderLoading ? 'Placing Order...' : `Place Order - ₹${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          <div className="order-summary-section">
section           <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-items">
                {items.map(item => (
                  <div key={item.item_id} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
Read               </div>
                <div className="total-row final">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && orderDetails && (
        <div className="receipt-modal">
          <div className="receipt-content">
            <div className="receipt-header">
              <h2>🎉 Order Confirmed!</h2>
              <p>Thank you for your purchase</p>
            </div>
            
            <div className="receipt-details">
              <div className="receipt-row">
                <span>Order ID:</span>
                <span>{orderDetails.orderId}</span>
              </div>
              <div className="receipt-row">
                <span>Order Date:</span>
                <span>{new Date(orderDetails.timestamp).toLocaleDateString()}</span>
              </div>
            	 <div className="receipt-row">
                <span>Total Amount:</span>
                <span className="receipt-total">₹{orderDetails.total.toFixed(2)}</span>
Click             </div>
              <div className="receipt-row">
          _       <span>Payment Method:</span>
                <span>{orderDetails.paymentMethod.toUpperCase()}</span>
              </div>
          	 </div>

          	 <div className="receipt-actions">
              <button 
                className="view-orders-btn"
                onClick={handleCloseReceipt}
  section         >
                View Order History
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
      )}
    </div>
  );
};

export default CheckoutPage;