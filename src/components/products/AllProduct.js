import React, { useState } from 'react';
import Categories from './Categories';
import Items from './Items';
import Pagination from '../core/Pagination';
import { useNavigate } from 'react-router-dom';
import { BsFilterRight, BsSearch } from 'react-icons/bs';

function AllProduct(props) {
    const navigate = useNavigate();
    const [showCategories, setShowCategories] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const itemsPerPage = 16; // Number of items to display per page

    const handleItemCardClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the indexes of the items to be displayed based on the current page and items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.currentItems.slice(indexOfFirstItem, indexOfLastItem);

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
            <Items
                items={currentItems}
                onAdd={props.onAdd}
                deleteOrder={props.deleteOrder}
                addFavourites={props.addFavourites}
                deleteFavourites={props.deleteFavourites}
                onItemClick={handleItemCardClick}
            />
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={props.currentItems.length}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default AllProduct;
