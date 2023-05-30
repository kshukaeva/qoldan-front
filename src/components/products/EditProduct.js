import React, { useState, useEffect } from 'react';
import Uploaimagetest from "../core/Uploaimagetest";
import {IoArrowBackCircle} from 'react-icons/io5';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getCategories} from "../../api/CategoryAPI";
import {getProductTypes} from "../../api/ProductTypeAPI";
import {getProduct, postProduct, putProduct} from "../../api/ProductsAPI";

function EditProduct() {
    const { id } = useParams();

    const [product, setProduct] = useState({
        "id": 0,
        "title": "string",
        "summary": "string",
        "imageId": null,
        "category": "",
        "images": [],
        "price": 0,
        "type": "string",
        "tags": []
    });

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file");

    const navigate = useNavigate();

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
        getProduct(id)
            .then((response) => {
                setProduct({
                    id: response.data.id,
                    title: response.data.title,
                    summary: response.data.summary,
                    imageId: response.data.imageId,
                    category: response.data.category,
                    price: response.data.price,
                    type: response.data.type,
                    images: response.data.images,
                    tags: response.data.tags
                })
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        putProduct(product)
            .then((response) => {
                navigate(`/item/${product.id}`);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    };

    return (
        <div className="add-product-container">
            <div className="title-container">
                <Link to="/my-products" className="back-button">
                    <IoArrowBackCircle />
                </Link>
                <h1>Edit Product</h1>
            </div>
            <div className='form-container'>
                <form className='product-form' onSubmit={handleSubmit}>
                    <div className='form-row'>
                        <div className='form-col1'>
                            <label>

                                Product Name:
                                <input type="text"
                                       value={product.title}
                                       onChange={(e) => setProduct({...product, title: e.target.value})}/>
                            </label>
                            <label>
                                Product Description:
                                <textarea style={{height: '135px'}}
                                          value={product.summary}
                                          onChange={(e) => setProduct({...product, summary: e.target.value})} />
                            </label>

                            <label>
                                Price:
                                <input type="number"
                                       min="1"
                                       value={product.price}
                                       onChange={(e) => setProduct({...product, price: e.target.value})} />
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
                                <select
                                    value={product.category}
                                    onChange={(e) => setProduct({...product, category: e.target.value})} >
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
                                <select
                                    value={product.type}
                                    onChange={(e) => setProduct({...product, type: e.target.value})} >
                                    <option value="">Select a type</option>
                                    {types.map((type) => (
                                        <option key={type.title} value={type.title}>
                                            {type.title}
                                        </option>
                                    ))}
                                </select>
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
