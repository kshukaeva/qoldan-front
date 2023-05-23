import React, {useState, Component, useEffect,} from 'react';
import axios from 'axios';
import Uploaimagetest from "../Uploaimagetest";
import {getCategories} from "../../api/CategoryAPI";
import {getProductTypes} from "../../api/ProductTypeAPI";
import {postProduct} from "../../api/ProductsAPI";
import {useNavigate} from "react-router-dom";

function AddProduct() {

  const [title, setTitle] = useState(null);
  const [summary, setSummary] = useState(null);
  const [img, setImg] = useState("keyboard1.jpeg");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [type, setType] = useState(null);

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file");

  const navigate = useNavigate();

  const handleTitleOnChange = (event) => {
    setTitle(event.target.value);
  }
  const handleSummaryOnChange = (event) => {
    setSummary(event.target.value);
  }
  const handlePriceOnChange = (event) => {
    setPrice(event.target.value);
  }
  const handleCategoryOnChange = (event) => {
    setCategory(event.target.value);
  }
  const handleTypeOnChange = (event) => {
    setType(event.target.value);
  }

  useEffect(() => {
    getCategories()
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          alert(error.response.data);
        })
        .finally(() => {});
    getProductTypes()
        .then((response) => {
          setTypes(response.data);
        })
        .catch((error) => {
          alert(error.response.data);
        })
        .finally(() => {});
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      title: title,
      summary: summary,
      img: img,
      category: category,
      price: price,
      type: type
    }
    postProduct(product)
        .then((response) => {
          navigate(`/item/${response.data}`);
        })
        .catch((error) => {
          alert(error.response.data);
        })
        .finally(() => {});
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
                  <input type="text" value={title} onChange={handleTitleOnChange}/>
                </label>
                <label>
                  Product Description:
                  <textarea style={{height: '135px'}} value={summary} onChange={handleSummaryOnChange} />
                </label>

                <label>
                  Price:
                  <input type="number" min="1" value={price} onChange={handlePriceOnChange} />
                </label>
              </div>
              <div className='form-col2'>
                <label>
                  Image URL:
                  {/*<input type="text" value={productImage} onChange={handleProductImageChange} />*/}
                  <Uploaimagetest image={image} setImage={setImage} fileName={fileName} setFileName={setFileName} />
                </label>

                <label>
                  Category:
                  <select value={category} onChange={handleCategoryOnChange} >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.title} value={category.title}>
                          {category.title}
                        </option>
                    ))}
                  </select>
                </label>
                <label>
                  Product Type:
                  <select value={type} onChange={handleTypeOnChange} >
                    <option value="">Select a type</option>
                    {types.map((category) => (
                        <option key={category.title} value={category.title}>
                          {category.title}
                        </option>
                    ))}
                  </select>
                </label>
              </div>

            </div>
            {/*<div className='check-box-row'>*/}
            {/*  <div className='check-box-col1'>*/}
            {/*    <label>*/}
            {/*      <input*/}
            {/*          type="radio"*/}
            {/*          name="product-type"*/}
            {/*          value="Vintage"*/}
            {/*          checked={selectedType === 'Vintage'}*/}
            {/*          onChange={handleTypeChange}*/}
            {/*      />*/}
            {/*      Vintage*/}
            {/*    </label>*/}
            {/*  </div>*/}
            {/*  <div className='check-box-col2'>*/}
            {/*    <label>*/}
            {/*      <input*/}
            {/*          type="radio"*/}
            {/*          name="product-type"*/}
            {/*          value="Secondhand"*/}
            {/*          checked={selectedType === 'Secondhand'}*/}
            {/*          onChange={handleTypeChange}*/}
            {/*      />*/}
            {/*      Secondhand*/}
            {/*    </label>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <button type="submit" >Submit</button>

          </form>
        </div>
      </div>
  );
}



export default AddProduct;
