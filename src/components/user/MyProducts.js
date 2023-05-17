import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';

const MyProducts = ({ userData }) => {
    const navigate = useNavigate();

    const handleEditProduct = (productId) => {
        navigate(`/edit-product`);
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
                {userData.myProducts &&
                    userData.myProducts.map((item) => (
                        <li key={item.id}>
                            <div className="my-products-info">
                                <img src={'../img/' + item.imageUrl} alt={item.name} />
                                <div className="my-products-inf">
                                    <p>{item.name}</p>
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
