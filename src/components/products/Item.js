import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsCart2, BsCartCheckFill } from 'react-icons/bs';

const Item = ({ item, onAdd, deleteOrder, onItemClick, addFavourites, deleteFavourites }) => {
  const [favourite, setFavourite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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

  const handleAddToCart = () => {
    if (addedToCart) {
      deleteOrder(item.id);
    } else {
      onAdd(item);
    }
    setAddedToCart(!addedToCart);
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
              {addedToCart ? (
                  <BsCartCheckFill className='add-to-cart' onClick={handleAddToCart}/>
              ) : (
                  <BsCart2 className='add-to-cart' onClick={handleAddToCart} />
              )}
            </div>
        )}
      </div>
  );
};

export default Item;
