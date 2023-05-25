import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Pagination from '../core/Pagination';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/products.json');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteProduct = (productId) => {
        // Delete product
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="manage-products-container">
            <h3>Manage Products</h3>
            <div className="product-list">
                {currentProducts.map((product) => (
                    <div className="product-item" key={product.id}>
                        <div className="product-details">
                            <img src={"../img/"+product.imageUrl} alt={product.title} />
                            <div className="product-info">
                                <Link to={`/item/${product.id}`} className="product-title">
                                    {product.title}
                                </Link>
                                <span className="product-price">${product.price}</span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <span className="delete-icon" onClick={() => handleDeleteProduct(product.id)}>
                                <MdDelete />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={products.length}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ManageProducts;
