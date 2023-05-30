import React, {useEffect, useState} from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {FiShoppingBag, FiShoppingCart} from 'react-icons/fi';
import {noImageUrl} from "../../helper/ImageHelper";
import {getImageUrl} from "../../api/ImageAPI";

const Favourites = ({
                        item, onAdd, onRemove, onItemClick, isFavourite, addFavourites, deleteFavourites,
                        callback, setCallback
                    }) => {

    const [image, setImage] = useState(noImageUrl);

    const handleItemClick = () => {
        onItemClick(item.id);
    };

    useEffect(() => {
        setImage(getImageUrl(item.imageId));
    }, []);

    return (
        <div className='fav-item'>
            <div className="item-image-container">
                <img src={image} alt={item.title}/>
                {item.inWishlist ? (
                    <AiFillHeart className='fav' onClick={() => deleteFavourites(item.id, callback, setCallback)}/>
                ) : (
                    <AiOutlineHeart className='fav' onClick={() => addFavourites(item.id, callback, setCallback)}/>
                )}
            </div>
            <h2 onClick={handleItemClick}>{item.title}</h2>
            <b>{item.price} KZT</b>
            {!item.inCart ? (
                <FiShoppingCart className='add-to-cart' onClick={() => onAdd(item.id, callback, setCallback)}/>
            ) : (
                <FiShoppingBag className='add-to-cart' onClick={() => onRemove(item.id, callback, setCallback)}/>
            )}
        </div>
    )
}

export default Favourites;
