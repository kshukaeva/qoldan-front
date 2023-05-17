import React, { useState, useEffect } from 'react';
import Uploaimagetest from "../Uploaimagetest";
import {IoArrowBackCircle} from 'react-icons/io5';
import {Link} from "react-router-dom";
function EditProduct() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['Electronics', 'Clothing', 'Home', 'Beauty'];
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value); // update the selected type when user changes the radio button
    }
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch('/userData.json');
                const userData = await response.json();

                // Replace '123' with the ID of the product you want to edit
                const productData = userData.find((myProducts) => myProducts.id === '1');

                setProductName(productData.title);
                setProductDescription(productData.summary);
                setProductPrice(productData.price);
                setProductImage(productData.imageUrl);
                setSelectedType(productData.type);
                setSelectedCategory(productData.category);
            } catch (error) {
                console.log('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, []);

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to submit the updated product data to the server
    };

    return (
        <div className="add-product-container">
            <div className="title-container">
                <Link to="/my-products" className="back-button">
                    <IoArrowBackCircle />
                </Link>
                <h1>Edit Product</h1>
            </div>
            <div className="form-container">
                <form className="product-form" onSubmit={handleSubmit}>
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
                                Category:
                                <select value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
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
                    </div>
                    <button type="submit" >Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
