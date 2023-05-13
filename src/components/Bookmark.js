import React from 'react';
import Favourites from './Favourites';
import {useNavigate, useParams} from "react-router-dom";

const Bookmark = ({ items, favourites, onAdd, addFavourites,deleteFavourites }) => {
    const { id } = useParams();
    const relatedProducts = items.filter(item => item.category === item.category && item.id !== Number(id)).slice(0, 3);
    const navigate = useNavigate();
    const handleItemCardClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };
return (
  <div className='bookmark-container'>
      <span className='fc-title'>Мои избранные</span>
      {favourites.length > 0 ? (
          <div className='bookmark'>
              {favourites.map((el) => (
                  <Favourites key={el.id} item={el} onAdd={onAdd} addFavourites ={addFavourites} deleteFavourites={deleteFavourites} onItemClick={handleItemCardClick} />
              ))}
          </div>
      ) : (
          <div className='empty'>
              <h3>Избранных нету</h3>
          </div>
      )}
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
);
};

export default Bookmark;
