// src/components/shopkeeper/AddItemModal.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearShopItemsError } from '../../store/slice/shopItemsSlice';
import './ShopModals.css';

const AddItemModal = ({ onClose, onSave, shopId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.shopItems);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image_url: '',
    number_of_product_available: '',
    category_type: '',
  });

  const categories = [
    'Clothing',
    'Smartphones', 
    'Electronics',
    'Fruits',
    'Vegetables',
    'Laptops'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) {
      dispatch(clearShopItemsError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.number_of_product_available) {
      return;
    }

    const itemData = {
      ...formData,
      price: parseFloat(formData.price),
      number_of_product_available: parseInt(formData.number_of_product_available)
    };
    console.log(itemData) ; 
    await onSave(itemData);
  };

  const isFormValid = formData.name && formData.price && formData.number_of_product_available;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Product</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="number_of_product_available">Stock Quantity *</label>
              <input
                type="number"
                id="number_of_product_available"
                name="number_of_product_available"
                value={formData.number_of_product_available}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category_type">Category</label>
            <select
              id="category_type"
              name="category_type"
              value={formData.category_type}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Image URL</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
            <small className="help-text">
              Optional: Provide a URL for product image
            </small>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Adding...
                </>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;