import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {FiShoppingBag, FiShoppingCart} from 'react-icons/fi';
import {getProduct} from "../api/ProductsAPI";

const ItemCard = ({ items, onAdd, onRemove, addFavourites, deleteFavourites, addToCart, removeFromCart }) => {
  const { id } = useParams();
  const productId = id;
  const [selectedItemId, setSelectedItemId] = useState(null);
  // const [isFavourite, setIsFavourite] = useState(false);
  // const item = items.find(item => item.id === Number(id));
  // const relatedProducts = items.filter(item => item.category === item.category && item.id !== Number(id)).slice(0, 3);
  const relatedProducts = [];

  // const handleItemClick = (itemId) => {
  //   setSelectedItemId(itemId);
  // };

  // const handleFavouriteClick = (item) => {
  //   setIsFavourite(!isFavourite);
  //   if (isFavourite) {
  //     deleteFavourites(item);
  //   } else {
  //     addFavourites(item);
  //   }
  // };

  const [callback, setCallback] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    getProduct(productId)
        .then((response) => {
          setItem(response.data);
          console.log(response.data);
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
                <img src={"../img/"+item.img} alt={item.title}/>
                {item.inWishlist ? (
                    <AiFillHeart className='fav' onClick={() => deleteFavourites(item.id, callback, setCallback)} />
                ) : (
                    <AiOutlineHeart className='fav' onClick={() => addFavourites(item.id, callback, setCallback)} />
                )}
              </div>
              <div className="three-image-container">
                <img src={"../img/"+item.img} alt={item.title}/>
                <img src={"../img/"+item.img} alt={item.title}/>
                <img src={"../img/"+item.img} alt={item.title}/>
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
          <div className="second-main-container">
            <h2>You Also Like It</h2>
            <div className="recommendation-container">
              {relatedProducts.map(product => (
                <div key={product.id} className="recommendation-item">
                  <img src={"../img/"+product.img} alt={product.title}/>
                  <h3>{product.title}</h3>
                  {/*<p>{product.category}</p>*/}
                  <b>{product.price} KZT</b>
                  {/*<div className='add-to-cart' onClick={() => onAdd(product)}> <FiShoppingCart/> </div>*/}
                  {/*{addFavourites ? (isFavourite ? <AiFillHeart className='fav' onClick={() => handleFavouriteClick(product)} /> : <AiOutlineHeart className='fav' onClick={() => handleFavouriteClick(product)} />) : null}*/}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
