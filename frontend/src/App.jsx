// src/App.jsx (updated)
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth } from './store/slice/authSlice';
import LandingPage from './LandingPages/Landing';
import Login from './AuthPages/login';
import Signup from './AuthPages/signup';
import HomePage from './userDashboard/Homepage1';
import ShopkeeperDashboard from './shopkeeperDashboard/ShopkeeperDashboard1';
import ShopRegistration from './components/shopkeeper/ShopRegistration';


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { shopCreated } = useSelector((state) => state.shop);

  useEffect(() => {
    // Initialize auth state from localStorage on app start
    dispatch(initializeAuth());
  }, [dispatch]);

  // Protected route component for shopkeeper
  const ShopkeeperRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    if (user?.type !== 'shopkeeper') {
      return <Navigate to="/home" />;
    }

    // If shopkeeper doesn't have a shop yet, redirect to registration
    if (!shopCreated && user.type === 'shopkeeper') {
      return <Navigate to="/shopkeeper/register" />;
    }

    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
  
        
        {/* Shopkeeper Routes */}
        <Route 
          path="/shopkeeper/register" 
          element={
            isAuthenticated && user?.type === 'shopkeeper' ? (
              <ShopRegistration />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/shopkeeper/dashboard" 
          element={
            <ShopkeeperRoute>
              <ShopkeeperDashboard />
            </ShopkeeperRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;