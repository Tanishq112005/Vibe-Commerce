// src/components/shopkeeper/ShopRegistration.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createShop, clearShopError } from '../../store/slice/shopSlice';
import './ShopRegistration.css';

const ShopRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, shopCreated, shop } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    shopkeeper_name: '',
  });

  useEffect(() => {
    if (shopCreated && shop) {
      // Redirect to dashboard after successful shop creation
      navigate('/shopkeeper/dashboard');
    }
  }, [shopCreated, shop, navigate]);

  useEffect(() => {
    // Pre-fill shopkeeper name from user data
    if (user?.name) {
      setFormData(prev => ({
        ...prev,
        shopkeeper_name: user.name
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      dispatch(clearShopError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.shopkeeper_name) {
      return;
    }

    try {
      await dispatch(createShop(formData)).unwrap();
    } catch (error) {
      console.error('Failed to create shop:', error);
    }
  };

  return (
    <div className="shop-registration-page">
      <div className="shop-registration-container">
        <div className="shop-registration-card">
          <div className="registration-header">
            <h1>Setup Your Shop</h1>
            <p>Welcome to ShopEasy! Let's get your shop ready for business.</p>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="shopkeeper_name">Your Name</label>
              <input
                type="text"
                id="shopkeeper_name"
                name="shopkeeper_name"
                value={formData.shopkeeper_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Shop Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your shop name"
                required
                disabled={loading}
              />
              <small className="help-text">
                This will be displayed to customers on the platform
              </small>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading || !formData.name || !formData.shopkeeper_name}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Setting Up Shop...
                  </>
                ) : (
                  'Create Shop'
                )}
              </button>
            </div>
          </form>

          <div className="registration-info">
            <h3>What's Next?</h3>
            <ul>
              <li>✅ Add products to your shop</li>
              <li>✅ Set prices and inventory</li>
              <li>✅ Start receiving orders</li>
              <li>✅ Manage your business easily</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopRegistration;