import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import {getMyProducts} from "../../api/ProductsAPI";
import {getImageUrl} from "../../api/ImageAPI";

const MyProducts = ({ userData }) => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getMyProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    }, []);

    const handleEditProduct = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    const handleDeleteProduct = (productId) => {
        // Perform delete product logic
        console.log('Delete product:', productId);
    };

    return (
        <div className="list-of-my-products">
            <h3>My Products</h3>
            <div className="add-new-product">
                <div className="add-new-product-button" onClick={() => navigate('/addproduct')}>
                    <span>Add New Product</span>
                </div>
            </div>
            <ul>
                {products &&
                    products.map((product) => (
                        <li key={product.id}>
                            <div className="my-products-info">
                                <img src={getImageUrl(product.imageId)} alt={product.title} />
                                <div className="my-products-inf">
                                    <p>{product.title}</p>
                                    <b>KZT {product.price}</b>
                                </div>
                            </div>
                            <div className="my-products-edit">
                                <AiOutlineEdit
                                    className="product-edit-icon"
                                    onClick={() => handleEditProduct(product.id)}
                                />
                                <MdDeleteOutline
                                    className="product-delete-icon"
                                    onClick={() => handleDeleteProduct(product.id)}
                                />
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default MyProducts;
