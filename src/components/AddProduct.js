import React, { useState } from 'react';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  }

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  }

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  }

  const handleProductImageChange = (event) => {
    setProductImage(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit product data to server
  }

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={handleProductNameChange} />
        </label>
        <label>
          Product Description:
          <textarea value={productDescription} onChange={handleProductDescriptionChange} />
        </label>
        <label>
          Price:
          <input type="number" value={productPrice} onChange={handleProductPriceChange} />
        </label>
        <label>
          Image URL:
          <input type="text" value={productImage} onChange={handleProductImageChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
