import React, { useState, Component, } from 'react';
import axios from 'axios';
import Uploaimagetest from "./Uploaimagetest";

// const initialValues = {
//   productName: "",
//   productDescription: "",
//   productPrice: 0,
//   productQuantity: 0,
//   productCategory: "",
//   productImg: "",
// };


function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productQuantity,setProductQuantity] = useState('')
  const [selectedType, setSelectedType] = useState(''); // keep track of the selected type

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value); // update the selected type when user changes the radio button
  }
  // const [values, setValues] = useState(initialValues);
  //
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };



  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  }

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  }

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  }

  const handleProductQuantityChange =(event)=>{
    setProductQuantity(event.target.value);
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
        <div className='form-container'>
          <form className='product-form' onSubmit={handleSubmit}>
            <div className='form-row'>
              <div className='form-col1'>
                <label>

                  Product Name:
                  <input type="text" value={productName} onChange={handleProductNameChange} />
                </label>
                <label>
                  Product Description:
                  <textarea style={{height: '135px'}} value={productDescription} onChange={handleProductDescriptionChange} />
                </label>

                <label>
                  Price:
                  <input type="number" min="0" value={productPrice} onChange={handleProductPriceChange} />
                </label>
              </div>
              <div className='form-col2'>
                <label>
                  Image URL:
                  {/*<input type="text" value={productImage} onChange={handleProductImageChange} />*/}
                  <Uploaimagetest></Uploaimagetest>
                </label>

                <label>
                  Quantity:
                  <input type="number" min="0" value={productQuantity} onChange={handleProductQuantityChange} />
                </label>
              </div>
            </div>
            <div className='check-box-row'>
              <div className='check-box-col1'>
                <label>
                  <input
                      type="radio"
                      name="product-type"
                      value="Vintage"
                      checked={selectedType === 'Vintage'}
                      onChange={handleTypeChange}
                  />
                  Vintage
                </label>
              </div>
              <div className='check-box-col2'>
                <label>
                  <input
                      type="radio"
                      name="product-type"
                      value="Secondhand"
                      checked={selectedType === 'Secondhand'}
                      onChange={handleTypeChange}
                  />
                  Secondhand
                </label>
              </div>
              <div className='check-box-col3'>
                <label>
                  <input
                      type="radio"
                      name="product-type"
                      value="Charity"
                      checked={selectedType === 'Charity'}
                      onChange={handleTypeChange}
                  />
                  Charity
                </label>
              </div>
              <div className='check-box-col4'>
                <label>
                  <input
                      type="radio"
                      name="product-type"
                      value="Recycling"
                      checked={selectedType === 'Recycling'}
                      onChange={handleTypeChange}
                  />
                  Recycling
                </label>
              </div>
            </div>
            <button type="submit">Submit</button>

          </form>
        </div>
      </div>
  );
}



export default AddProduct;
