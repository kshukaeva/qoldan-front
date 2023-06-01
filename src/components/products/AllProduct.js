import React, { useState, useEffect } from 'react';
import Items from './Items';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductPages, getProducts } from '../../api/ProductsAPI';
import Pagination from '../core/Pagination';
import { getCategories } from '../../api/CategoryAPI';
import { getProductTypes } from '../../api/ProductTypeAPI';
import './ProductStyle.css';
function AllProduct(props) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const [categories, setCategories] = useState([]); // Define the categories state
    const [typeData, setTypeData] = useState([]); // Define the categories state

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const itemsPerPage = 16; // Number of items to display per page

    useEffect(() => {
        getProductPages(itemsPerPage)
            .then((response) => {
                setTotalPages(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});

        getProducts(itemsPerPage, itemsPerPage * (currentPage - 1))
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});

        getCategories()
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            });

        getProductTypes()
            .then((response)=>{
            setTypeData(response.data);
            })
            .catch((error) =>{
            alert(error.response.data);
            });
    }, [callback, currentPage]);

    const handleItemCardClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setCallback(!callback);
    };

    return (
        <div className='all'>
            <div className='filter'>
                <label>
                    <select>
                        <option value=''>Product Type</option>
                        {typeData.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.title}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <select>
                        <option value=''>Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <select>
                        <option value=''>Sort</option>
                        <option value='newest'>Newest</option>
                        <option value='oldest'>Oldest</option>
                        <option value='priceHighLow'>Price: High-Low</option>
                        <option value='priceLowHigh'>Price: Low-High</option>
                    </select>
                </label>
            </div>
            <Items
                items={products}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                addFavourites={props.addFavourites}
                deleteFavourites={props.deleteFavourites}
                onItemClick={handleItemCardClick}
                callback={callback}
                setCallback={setCallback}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default AllProduct;
