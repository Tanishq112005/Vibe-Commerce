// src/components/auth/Signup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // <-- FIX: Import useLocation
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, clearError } from '../store/slice/authSlice';
import './Auth.css';

const Signup = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const location = useLocation(); // <-- FIX: Get location

     const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
     const { shopCreated } = useSelector((state) => state.shop);

     // FIX: Read 'type' from URL query params
     const queryParams = new URLSearchParams(location.search);
     const userType = queryParams.get('type') || 'customer';

     const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
          mobile_number: '',
          address: '',
          type: userType, // <-- FIX: Set type from URL
     });

     const [showShopFields, setShowShopFields] = useState(userType === 'shopkeeper'); // <-- FIX

     // Redirect if already authenticated
     useEffect(() => {
          if (isAuthenticated) {
               if (user?.type === 'shopkeeper') {
                    if (shopCreated) {
                         navigate('/shopkeeper/dashboard');
                    } else {
                         navigate('/shopkeeper/register');
                    }
               } else {
                    navigate('/home');
               }
          }
     }, [isAuthenticated, user, shopCreated, navigate]);

     // Clear error when component unmounts
     useEffect(() => {
          return () => {
               dispatch(clearError());
          };
     }, [dispatch]);

     const handleChange = (e) => {
          const { name, value } = e.target;
          
          setFormData({
               ...formData,
               [name]: value,
          });

          if (name === 'type') {
               setShowShopFields(value === 'shopkeeper');
          }

          if (error) {
               dispatch(clearError());
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          
          if (!formData.name || !formData.email || !formData.password) {
               return;
          }

          try {
               const result = await dispatch(signupUser(formData)).unwrap();
               
               if (result) {
                    console.log('Signup successful!');
               }
          } catch (error) {
               console.error('Signup failed:', error);
          }
     };

     return (
          <div className="auth-container">
               <div className="auth-card">
                    <div className="auth-header">
                         <h1>Create Account</h1>
                         <p>Join ShopEasy today</p>
                    </div>

                    {error && (
                         <div className="error-message">
                              <span>⚠️</span>
                              {error}
                         </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                         <div className="form-group">
                              <label htmlFor="name">Full Name</label>
                              <input
                                   type="text"
                                   id="name"
                                   name="name"
                                   value={formData.name}
                                   onChange={handleChange}
                                   placeholder="Enter your full name"
                                   required
                                   disabled={loading}
                              />
                         </div>

                         <div className="form-group">
                              <label htmlFor="email">Email Address</label>
                              <input
                                   type="email"
                                   id="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   placeholder="Enter your email"
                                   required
                                   disabled={loading}
                              />
                         </div>

                         <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input
                                   type="password"
                                   id="password"
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   placeholder="Create a password"
                                   required
                                   disabled={loading}
                              />
                         </div>

                         <div className="form-group">
                              <label htmlFor="mobile_number">Mobile Number</label>
                              <input
                                   type="tel"
                                   id="mobile_number"
                                   name="mobile_number"
                                   value={formData.mobile_number}
                                   onChange={handleChange}
                                   placeholder="Enter your mobile number"
                                   disabled={loading}
                              />
                         </div>

                         <div className="form-group">
                              <label htmlFor="address">Address</label>
                              <textarea
                                   id="address"
                                   name="address"
                                   value={formData.address}
                                   onChange={handleChange}
                                   placeholder="Enter your address"
                                   rows="3"
                                   disabled={loading}
                              />
                         </div>

                         <div className="form-group">
                              <label htmlFor="type">Account Type</label>
                              <select
          _                     id="type"
                                   name="type"
                                   value={formData.type}
                                   onChange={handleChange}
                                   disabled={loading}
                              >
                                   <option value="customer">Customer</option>
                                   <option value="shopkeeper">Shopkeeper</option>
                              </select>
                         </div>

                         {showShopFields && (
                              <div className="shopkeeper-notice">
                                   <p>🎉 Welcome Shopkeeper! After signing up, you'll be able to set up your shop and start adding products.</p>
                              </div>
                         )}

                         <button 
                              type="submit" 
                              className="auth-button primary"
                              disabled={loading || !formData.name || !formData.email || !formData.password}
                         >
                              {loading ? (
                                   <>
                                        <div className="spinner"></div>
                                        Creating Account...
                                   </>
                              ) : (
                                   'Create Account'
                              )}
                         </button>
                    </form>

                    <div className="auth-footer">
                         <p>
                              Already have an account?{' '}
                              <Link to="/login" className="auth-link">
                                   Sign in here
                              </Link>
                         </p>
                         <p>
                              <Link to="/" className="auth-link">
                                   ← Back to Home
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
};

export default Signup;