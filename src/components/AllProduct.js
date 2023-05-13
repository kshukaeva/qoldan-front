import React from 'react';
import Categories from './Categories';
import Items from './Items';
import { useNavigate } from 'react-router-dom';



function AllProduct(props) {
  const navigate = useNavigate();

  const handleItemCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div className='all'>
      <input type="text" placeholder="What are you looking for?" className="search-bar" /> 
      <Categories chooseCategory={props.chooseCategory} />
      <Items items={props.currentItems} onAdd={props.onAdd} addFavourites={props.addFavourites} deleteFavourites={props.deleteFavourites} onItemClick={handleItemCardClick}/>
    </div>
  );
}

export default AllProduct;
