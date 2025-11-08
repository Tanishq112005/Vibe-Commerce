// src/pages/OrderHistoryPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { getOrders, deleteOrder } from '../store/slice/orderSlice';
import './OrderPageHistory.css';

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getOrders());
    }
  }, [dispatch, user]);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await dispatch(deleteOrder(orderId)).unwrap();
        // Refresh orders after deletion
        dispatch(getOrders());
      } catch (error) {
        console.error('Failed to delete order:', error);
      }
    }
  };

  const handleReorder = (order) => {
    // Implement reorder logic here
    console.log('Reorder:', order);
    alert('Reorder feature coming soon!');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'delivered';
      case 'shipped': return 'shipped';
      case 'processing': return 'processing';
      case 'cancelled': return 'cancelled';
      default: return 'pending';
    }
  };

  if (!user) {
    return (
      <div className="order-history-page">
        <Header />
        <div className="order-history-container">
          <div className="login-required">
            <h2>Please Login</h2>
            <p>You need to be logged in to view your order history.</p>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <Header />
      
      <div className="order-history-container">
        <div className="order-history-header">
          <h1>Order History</h1>
          <p>View your past orders and track their status</p>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <div>
              <strong>Error loading orders</strong>
              <p>{error}</p>
            </div>
            <button onClick={() => dispatch(getOrders())}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-id">Order #{order.id}</h3>
                    <span className="order-date">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="order-actions">
                    <button
                      className="reorder-btn"
                      onClick={() => handleReorder(order)}
                    >
                      Reorder
                    </button>
                    <button
                      className="delete-order-btn"
                      onClick={() => handleDeleteOrder(order.id)}
                      title="Delete order"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="order-status">
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {order.status || 'Processing'}
                  </span>
                  <span className="order-total">₹{order.total_amount}</span>
                </div>

                <div className="order-items">
                  {order.items && order.items.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img 
                          src={item.image_url || 'https://via.placeholder.com/50x50?text=No+Image'} 
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                      </div>
                      <span className="item-price">₹{item.price}</span>
                    </div>
                  ))}
                </div>

                {order.shipping_address && (
                  <div className="shipping-info">
                    <strong>Shipping to:</strong>
                    <p>{order.shipping_address}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your order history here.</p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;