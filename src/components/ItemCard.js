import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';

const ItemCard = ({ items, onAdd, addFavourites, deleteFavourites }) => {
  const { id } = useParams();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const item = items.find(item => item.id === Number(id));
  const relatedProducts = items.filter(item => item.category === item.category && item.id !== Number(id)).slice(0, 3);

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleFavouriteClick = (item) => {
    setIsFavourite(!isFavourite);
    if (isFavourite) {
      deleteFavourites(item);
    } else {
      addFavourites(item);
    }
  };

  return (
    <div className="main-container">
      {item && (
        <div>
          <div className="first-main-container">
            <div className="first-sub-container">
              <div className="main-image-container">
                <img src={"../img/"+item.imageUrl} alt={item.title}/>
                {isFavourite ? <AiFillHeart className='fav' onClick={() => handleFavouriteClick(item)} /> : <AiOutlineHeart className='fav' onClick={() => handleFavouriteClick(item)} />} 
              </div>
              <div className="three-image-container">
                <img src={"../img/"+item.imageUrl} alt={item.title}/>
                <img src={"../img/"+item.imageUrl} alt={item.title}/>
                <img src={"../img/"+item.imageUrl} alt={item.title}/>
              </div>
            </div>
            <div className="second-sub-container">
              <h2 onClick={handleItemClick}>{item.title}</h2>
              <p>Seller: {item.ownerName}</p>
              <p>{item.desc}</p>
              <p>Category: {item.categoryTitle}</p>
              <b>{item.price} KZT</b>
              <div className='add-to-cart' onClick={() => onAdd(item)}> <FiShoppingCart/> <span>ADD TO CART</span></div>
            </div>
          </div>
          <div className="second-main-container">
            <h2>You Also Like It</h2>
            <div className="recommendation-container">
              {relatedProducts.map(product => (
                <div key={product.id} className="recommendation-item">
                  <img src={"../img/"+product.imageUrl} alt={product.title}/>
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
