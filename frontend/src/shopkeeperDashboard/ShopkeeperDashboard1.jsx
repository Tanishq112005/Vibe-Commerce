// src/pages/ShopkeeperDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopItems, addShopItem, updateShopItem, deleteShopItem } from '../store/slice/shopItemsSlice';
import Header from '../components/common/Header';
import AddItemModal from '../components/shopkeeper/AddItemModal';
import EditItemModal from '../components/shopkeeper/EditItemModal';
import './ShopkeeperDashboard.css';

const ShopkeeperDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.shopItems);
  const { shop } = useSelector((state) => state.shop);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Redirect if user is not shopkeeper
    if (user && user.type !== 'shopkeeper') {
      navigate('/home');
      return;
    }

    // Fetch shop items
    dispatch(fetchShopItems());
  }, [dispatch, user, navigate]);

  const handleAddItem = async (itemData) => {
    try {
      await dispatch(addShopItem(itemData));
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleEditItem = async (itemId, updatedFields) => {
    try {
      await dispatch(updateShopItem({ id: itemId, updatedFields })).unwrap();
      setShowEditModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      try {
        await dispatch(deleteShopItem(itemId)).unwrap();
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  // Calculate dashboard statistics
  const totalItems = items.length;
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.number_of_product_available), 0);
  const lowStockItems = items.filter(item => item.number_of_product_available < 10).length;
  const outOfStockItems = items.filter(item => item.number_of_product_available === 0).length;

  if (!user || user.type !== 'shopkeeper') {
    return null;
  }

  return (
    <div className="shopkeeper-dashboard">
      <Header />
      
      <div className="dashboard-container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Shop Dashboard</h1>
            <p>Manage your products and inventory</p>
            {shop && (
              <div className="shop-info">
                <span className="shop-name">🏪 {shop.name}</span>
                <span className="shop-keeper">👨‍💼 {shop.shopkeeper_name}</span>
              </div>
            )}
          </div>
          <button 
            className="add-item-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Item
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>{totalItems}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>₹{totalValue.toLocaleString()}</h3>
              <p>Inventory Value</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <h3>{lowStockItems}</h3>
              <p>Low Stock Items</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <h3>{outOfStockItems}</h3>
              <p>Out of Stock</p>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="items-section">
          <div className="section-header">
            <h2>Your Products</h2>
            <div className="section-header-right">
              <span className="items-count">{items.length} items</span>
              {items.length > 0 && (
                <button 
                  className="add-item-btn secondary"
                  onClick={() => setShowAddModal(true)}
                >
                  + Add Item
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="error-message">
              <div className="error-icon">⚠️</div>
              <div className="error-text">
                <strong>Failed to load products</strong>
                <p>{error}</p>
              </div>
              <button 
                className="retry-btn"
                onClick={() => dispatch(fetchShopItems())}
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading your products...</p>
            </div>
          ) : items.length > 0 ? (
            <div className="items-table-container">
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="product-cell">
                          <img 
                            src={item.image_url || 'https://via.placeholder.com/50x50?text=No+Image'} 
                            alt={item.name}
                            className="product-image"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                            }}
                          />
                          <div className="product-details">
                            <span className="product-name">{item.name}</span>
                            {item.image_url && (
                              <small className="product-image-indicator">🖼️ Has Image</small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-tag">
                          {item.category_type || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="price-cell">₹{item.price}</td>
                      <td className="stock-cell">{item.number_of_product_available}</td>
                      <td>
                        <span className={`status-badge ${
                          item.number_of_product_available === 0 ? 'out-of-stock' :
                          item.number_of_product_available < 10 ? 'low-stock' : 'in-stock'
                        }`}>
                          {item.number_of_product_available === 0 ? 'Out of Stock' :
                           item.number_of_product_available < 10 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="edit-btn"
                            onClick={() => openEditModal(item)}
                            title="Edit product"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteItem(item.id)}
                            title="Delete product"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-items">
              <div className="no-items-icon">📦</div>
              <h3>No Products Yet</h3>
              <p>Start by adding your first product to your shop</p>
              <button 
                className="add-first-item-btn"
                onClick={() => setShowAddModal(true)}
              >
                Add Your First Product
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddItem}
          shopId={shop?.id}
        />
      )}

      {showEditModal && selectedItem && (
        <EditItemModal
          item={selectedItem}
          onClose={() => {
            setShowEditModal(false);
            setSelectedItem(null);
          }}
          onSave={handleEditItem}
        />
      )}
    </div>
  );
};

export default ShopkeeperDashboard;