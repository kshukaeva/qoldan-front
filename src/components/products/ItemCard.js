import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {FiShoppingBag, FiShoppingCart} from 'react-icons/fi';
import {getProduct} from "../../api/ProductsAPI";
import {getImageUrl} from "../../api/ImageAPI";
import {noImageUrl} from "../../helper/ImageHelper";

const ItemCard = ({ items, onAdd, onRemove, addFavourites, deleteFavourites, addToCart, removeFromCart }) => {
  const { id } = useParams();
  const productId = id;
  const [ image, setImage ] = useState(noImageUrl);

  const relatedProducts = [];

  const [callback, setCallback] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    getProduct(productId)
        .then((response) => {
          setItem(response.data);
          setImage(getImageUrl(response.data.imageId));
        })
        .catch((error) => {
          alert(error.response.data);
        })
        .finally(() => {});
  }, [callback]);

  return (
    <div className="main-container">
      {item && (
        <div>
          <div className="first-main-container">
            <div className="first-sub-container">
              <div className="main-image-container">
                <img src={image} alt={item.title}/>
                {item.inWishlist ? (
                    <AiFillHeart className='fav' onClick={() => deleteFavourites(item.id, callback, setCallback)} />
                ) : (
                    <AiOutlineHeart className='fav' onClick={() => addFavourites(item.id, callback, setCallback)} />
                )}
              </div>
              <div className="three-image-container">
                <img src={image} alt={item.title}/>
                <img src={image} alt={item.title}/>
                <img src={image} alt={item.title}/>
              </div>
            </div>
            <div className="second-sub-container">
              <h2>{item.title}</h2>
              <p>Seller: {item.username}</p>
              <p>{item.summary}</p>
              <p>Category: {item.category}</p>
              <b>{item.price} KZT</b>
              {!item.inCart ? (
                  <FiShoppingCart className='add-to-cart' onClick={() => onAdd(item.id, callback, setCallback)} />
              ) : (
                  <FiShoppingBag className='add-to-cart' onClick={() => onRemove(item.id, callback, setCallback)}/>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
