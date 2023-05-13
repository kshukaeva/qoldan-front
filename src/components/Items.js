import React from 'react';
import Item from './Item';

const Items = ({ items, onAdd, onItemClick, addFavourites,deleteFavourites }) => {
  return (
    <div className='items'>
      {items.map(el => (
        <Item key={el.id} item={el} onAdd={onAdd} addFavourites ={addFavourites} deleteFavourites={deleteFavourites} onItemClick={onItemClick} />
      ))}
    </div>
  );
};

export default Items;
