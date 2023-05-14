import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';

const Item = ({ item, onAdd, onItemClick, isFavourite, addFavourites, deleteFavourites }) => {
  const [favourite, setFavourite] = useState(isFavourite);

  const handleFavouriteClick = () => {
    if (favourite) {
      deleteFavourites(item.id);
    } else {
      addFavourites(item);
    }
    setFavourite(!favourite);
  };

  const handleItemClick = () => {
    onItemClick(item.id);
  };

  return (
      <div className='item'>
        {item && (
            <div>
              <div className="item-image-container">
                <img src={"../img/"+item.imageUrl} alt={item.title}/>
                {favourite ? (
                    <AiFillHeart className='fav' onClick={handleFavouriteClick} />
                ) : (
                    <AiOutlineHeart className='fav' onClick={handleFavouriteClick} />
                )}
              </div>
              <h2 onClick={handleItemClick}>{item.title}</h2>
              <b>{item.price} KZT</b>
              <FiShoppingCart className='add-to-cart' onClick={() => onAdd(item)} />
            </div>
        )}
      </div>
  );
};

export default Item;
