import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import {getMyProducts} from "../../api/ProductsAPI";

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
                    products.map((item) => (
                        <li key={item.id}>
                            <div className="my-products-info">
                                <img src={'../img/' + item.img} alt={item.title} />
                                <div className="my-products-inf">
                                    <p>{item.title}</p>
                                    <b>KZT {item.price}</b>
                                </div>
                            </div>
                            <div className="my-products-edit">
                                <AiOutlineEdit
                                    className="product-edit-icon"
                                    onClick={() => handleEditProduct(item.id)}
                                />
                                <MdDeleteOutline
                                    className="product-delete-icon"
                                    onClick={() => handleDeleteProduct(item.id)}
                                />
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default MyProducts;
