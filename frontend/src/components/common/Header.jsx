// src/components/common/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slice/authSlice';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/home')}>
          <h2>ShopEasy</h2>
        </div>

        <nav className="nav-menu">
          {isAuthenticated ? (
            <>
              {user?.type === 'customer' && (
                <button 
                  className="nav-btn cart-btn"
                  onClick={() => navigate('/cart')}
                >
                  🛒 Cart {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                </button>
              )}
              {user?.type === 'shopkeeper' && (
                <button 
                  className="nav-btn"
                  onClick={() => navigate('/shopkeeper/dashboard')}
                >
                  Dashboard
                </button>
              )}
              <button className="nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="nav-btn" onClick={() => navigate('/login')}>
                Login
              </button>
              <button 
                className="nav-btn primary" 
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;