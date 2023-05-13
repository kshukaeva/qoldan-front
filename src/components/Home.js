import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from './Items';
import {TbArrowNarrowRight} from 'react-icons/tb'
function Home(props) {
  const navigate = useNavigate();
  const [numItemsToShow] = useState(9);

  const handleSeeAllClick = () => {
    navigate('/all');
  };

  const handleItemCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const itemsToShow = props.currentItems.slice(0, numItemsToShow);

  return (
    <div className='home'>
      <div className='presentation'></div>
      <Items items={itemsToShow} onAdd={props.onAdd} addFavourites={props.addFavourites} deleteFavourites={props.deleteFavourites} onItemClick={handleItemCardClick} />
      <button onClick={handleSeeAllClick}>All product <TbArrowNarrowRight className='tbnarrow'/></button>
    </div>
  );
}

export default Home;
