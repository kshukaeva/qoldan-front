import React, {useEffect, useState} from 'react';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {BsCart2, BsCartCheckFill} from 'react-icons/bs';
import {getImage, getImageUrl} from "../../api/ImageAPI";
import {arrayBufferToBase64, noImageUrl} from "../../helper/ImageHelper";

const Item = ({
                  item,
                  onAdd,
                  onRemove,
                  onItemClick,
                  isFavourite,
                  addFavourites,
                  deleteFavourites,
                  callback,
                  setCallback
              }) => {
    const [itemImage, setItemImage] = useState(noImageUrl);

    const handleItemClick = () => {
        onItemClick(item.id);
    };

    useEffect(() => {
        setItemImage(getImageUrl(item.imageId));
    }, [callback]);

    return (
        <div className='item'>
            {item && (
                <div>
                    <div className="item-image-container">
                        <img src={itemImage} />
                        {item.inWishlist ? (
                            <AiFillHeart className='fav'
                                         onClick={() => deleteFavourites(item.id, callback, setCallback)}/>
                        ) : (
                            <AiOutlineHeart className='fav'
                                            onClick={() => addFavourites(item.id, callback, setCallback)}/>
                        )}
                    </div>
                    <h2 onClick={handleItemClick}>{item.title}</h2>
                    <b>{item.price} KZT</b>
                    {!item.inCart ? (
                        <BsCart2 className='add-to-cart' onClick={() => onAdd(item.id, callback, setCallback)}/>
                    ) : (
                        <BsCartCheckFill className='add-to-cart'
                                         onClick={() => onRemove(item.id, callback, setCallback)}/>
                    )}
                </div>
            )}
        </div>
    );
};

export default Item;
