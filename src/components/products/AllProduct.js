import React, {useState, useEffect} from 'react';
import Categories from './Categories';
import Items from './Items';
import {useNavigate, useParams} from 'react-router-dom';
import {getProductPages, getProducts} from "../../api/ProductsAPI";
import {BsFilterRight, BsSearch} from "react-icons/bs";
import Pagination from "../Pagination";

function AllProduct(props) {
    const navigate = useNavigate();
    const [ products, setProducts ] = useState([]);
    const [ callback, setCallback ] = useState(false);

    const [showCategories, setShowCategories] = useState(false);
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
    }, [callback]);

    const handleItemCardClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setCallback(!callback);
    };
    return (
        <div className='all'>
            <div className='all-search-bar'>
                <input type='text' placeholder='Search by Product, Category or ...' />
                <div className='all-icons'>
                    <BsFilterRight
                        className={`all-filter-icon ${showCategories ? 'active' : ''}`}
                        onClick={() => setShowCategories(!showCategories)}
                    />
                    <BsSearch className='all-search-icon' />
                </div>
            </div>
            {showCategories && <Categories chooseCategory={props.chooseCategory} />}
            <Items items={products}
                   onAdd={props.onAdd}
                   onRemove={props.onRemove}
                   addFavourites={props.addFavourites}
                   deleteFavourites={props.deleteFavourites}
                   onItemClick={handleItemCardClick}
                   callback={callback}
                   setCallback={setCallback}/>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default AllProduct;
