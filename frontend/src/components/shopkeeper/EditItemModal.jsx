// src/components/shopkeeper/EditItemModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearShopItemsError } from '../../store/slice/shopItemsSlice';
import './ShopModals.css';

const EditItemModal = ({ item, onClose, onSave }) => {
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

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        price: item.price || '',
        image_url: item.image_url || '',
        number_of_product_available: item.number_of_product_available || '',
        category_type: item.category_type || '',
      });
    }
  }, [item]);

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

    const updatedFields = {
      name: formData.name,
      price: parseFloat(formData.price),
      image_url: formData.image_url,
      number_of_product_available: parseInt(formData.number_of_product_available),
      category_type: formData.category_type
    };

    await onSave(item.id, updatedFields);
  };

  const isFormValid = formData.name && formData.price && formData.number_of_product_available;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Product</h2>
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
            <label htmlFor="edit-name">Product Name *</label>
            <input
              type="text"
              id="edit-name"
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
              <label htmlFor="edit-price">Price (₹) *</label>
              <input
                type="number"
                id="edit-price"
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
              <label htmlFor="edit-stock">Stock Quantity *</label>
              <input
                type="number"
                id="edit-stock"
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
            <label htmlFor="edit-category">Category</label>
            <select
              id="edit-category"
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
            <label htmlFor="edit-image">Image URL</label>
            <input
              type="url"
              id="edit-image"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
            {formData.image_url && (
              <div className="image-preview">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
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
                  Updating...
                </>
              ) : (
                'Update Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;