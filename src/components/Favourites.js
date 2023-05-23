import React, {useState, useEffect} from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {FiShoppingBag, FiShoppingCart} from 'react-icons/fi';
import Item from "./Item";
import {getMyWishlist} from "../api/WishlistAPI";

const Favourites = ({ item, onAdd, onRemove, onItemClick, isFavourite, addFavourites, deleteFavourites,
                        callback, setCallback }) =>{
    // const [favourite, setFavourite] = useState(isFavourite);

    // const handleFavouriteClick = () => {
    //     if (favourite) {
    //         addFavourites(item);
    //     } else {
    //         deleteFavourites(item.id);
    //     }
    //     setFavourite(!favourite);
    // };
    //
    const handleItemClick = () => {
        onItemClick(item.id);
    };
  return (
    <div className='fav-item'>
            <div className="item-image-container">
                <img src={"../img/"+item.img} alt={item.title}/>
                {item.inWishlist ? (
                    <AiFillHeart className='fav' onClick={() => deleteFavourites(item.id, callback, setCallback)} />
                ) : (
                    <AiOutlineHeart className='fav' onClick={() => addFavourites(item.id, callback, setCallback)} />
                )}
            </div>
            <h2 onClick={handleItemClick}>{item.title}</h2>
            <b>{item.price} KZT</b>
            {!item.inCart ? (
                <FiShoppingCart className='add-to-cart' onClick={() => onAdd(item.id, callback, setCallback)} />
            ) : (
                <FiShoppingBag className='add-to-cart' onClick={() => onRemove(item.id, callback, setCallback)}/>
            )}
    </div>
  )
}

export default Favourites;
