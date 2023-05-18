import React from 'react';
import Categories from './Categories';
import Items from './Items';
import { useNavigate } from 'react-router-dom';
import {BsFilterRight, BsSearch} from "react-icons/bs";



function AllProduct(props) {
  const navigate = useNavigate();

  const handleItemCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div className='all'>
        <div className="donation-search-bar">
            <input
                type="text"
                placeholder="Search by Product, Category or ..."
            />
            <div className="icons">
                <BsFilterRight
                    className='filter-icon'
                />
                <BsSearch className="search-icon" />
            </div>
        </div>
      <Categories chooseCategory={props.chooseCategory} />
      <Items items={props.currentItems} onAdd={props.onAdd} addFavourites={props.addFavourites} deleteFavourites={props.deleteFavourites} onItemClick={handleItemCardClick}/>
    </div>
  );
}

export default AllProduct;
