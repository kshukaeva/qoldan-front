import React from 'react';
import Item from './Item';

const Items = ({ items, onAdd, onItemClick, deleteOrder, addFavourites,deleteFavourites }) => {
  if (items) {
    return (
        <div className='items'>
          {items.map(el => (
              <Item key={el.id} item={el} onAdd={onAdd} deleteOrder={deleteOrder} addFavourites={addFavourites}
                    deleteFavourites={deleteFavourites} onItemClick={onItemClick}/>
          ))}
        </div>
    );
  }
};

export default Items;
