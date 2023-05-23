import React from 'react';
import Item from './Item';

const Items = ({ items, onAdd, onRemove, onItemClick, addFavourites,deleteFavourites, callback, setCallback }) => {
  if (items) {
    return (
        <div className='items'>
          {items.map(el => (
              <Item key={el.id} item={el} onAdd={onAdd} onRemove={onRemove} addFavourites={addFavourites}
                    deleteFavourites={deleteFavourites} onItemClick={onItemClick}
                    callback={callback} setCallback={setCallback}/>
          ))}
        </div>
    );
  }
};

export default Items;
