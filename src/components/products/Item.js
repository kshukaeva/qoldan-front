import React, {useEffect, useState} from 'react';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {BsCart2, BsCartCheckFill} from 'react-icons/bs';
import {getImage} from "../../api/ImageAPI";
import {arrayBufferToBase64} from "../../helper/ImageHelper";

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
    const [itemImage, setItemImage] = useState(null);

    const handleItemClick = () => {
        onItemClick(item.id);
    };

    useEffect(() => {
        getImage(item.imageId)
            .then((response) => {
                console.log(response);
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = arrayBufferToBase64(response.data);
                setItemImage(base64Flag + imageStr);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {
            });
    }, [callback]);

    return (
        <div className='item'>
            {item && (
                <div>
                    <div className="item-image-container">
                        <img src={`data:image/jpeg;base64,${itemImage}`}
                             onError={(target) => {
                                 target.onerror = null;
                                 target.src = '/img/default/no-photo.jpeg';
                             }}/>
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
