import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (user?.userType === 'shopkeeper') {
        navigate('/shopkeeper/dashboard');
      } else {
        navigate('/home');
      }
    } else {
      navigate('/signup');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="logo">
            <h1>ShopEasy</h1>
          </div>
          <nav className="nav-links">
            {!isAuthenticated ? (
              <>
                <button className="login-btn" onClick={handleLogin}>
                  Login
                </button>
                <button className="signup-btn" onClick={() => navigate('/signup')}>
                  Sign Up
                </button>
              </>
            ) : (
              <button className="dashboard-btn" onClick={handleGetStarted}>
                Go to Dashboard
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="highlight">ShopEasy</span>
            </h1>
            <p className="hero-subtitle">
              Your one-stop destination for all shopping needs. 
              Discover amazing products, great deals, and seamless shopping experience.
            </p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={handleGetStarted}>
                {isAuthenticated ? 'Continue Shopping' : 'Get Started'}
              </button>
              <button className="cta-button secondary" onClick={() => navigate('/home')}>
                Browse Products
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              🛒🛍️📦
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose ShopEasy?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your products delivered quickly and safely to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices and amazing deals on all products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Shopping</h3>
              <p>Your data and transactions are completely secure with us</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Quality Products</h3>
              <p>Curated selection of high-quality products from trusted sellers</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section className="sellers-section">
        <div className="container">
          <div className="sellers-content">
            <div className="sellers-text">
              <h2>Are you a Shopkeeper?</h2>
              <p>
                Join our platform and reach thousands of customers. 
                Manage your inventory, track orders, and grow your business with ShopEasy.
              </p>
              <button 
                className="seller-cta" 
                onClick={() => navigate('/signup?type=shopkeeper')}
              >
                Start Selling
              </button>
            </div>
            <div className="sellers-image">
              <div className="image-placeholder">🏪📊💼</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>ShopEasy</h3>
              <p>Making shopping easy and convenient for everyone.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => navigate('/#')}>Products</button></li>
                <li><button onClick={() => navigate('/#')}>About Us</button></li>
                <li><button onClick={() => navigate('/#')}>Contact</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><button>Help Center</button></li>
                <li><button>Shipping Info</button></li>
                <li><button>Returns</button></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ShopEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;