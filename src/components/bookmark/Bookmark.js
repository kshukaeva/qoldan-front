import React, {useEffect, useState} from 'react';
import Favourites from './Favourites';
import {useNavigate, useParams} from "react-router-dom";
import {getMyWishlist} from "../../api/WishlistAPI";
import './BookmarkStyle.css';

const Bookmark = ({ items, favourites, setFavourites, onAdd, onRemove, addFavourites,deleteFavourites }) => {
    const { id } = useParams();
    const relatedProducts = items ? items.filter(item => item.category === item.category && item.id !== Number(id)).slice(0, 3) : [];
    const navigate = useNavigate();
    const handleItemCardClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };
    // favourites = [{"id":3,"title":"Keyboard2","price":17000,"img":"keyboard1.jpeg","date":"2023-05-17T16:46:16.870+00:00","inWishlist":true,"inCart":false,"buyConfirmed":null,"sellConfirmed":null}]

    const [callback, setCallback] = useState(false);
    useEffect(() => {
        getMyWishlist()
            .then((response) => {
                setFavourites(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {})
    }, [callback]);

    return (
        <div className='bookmark-container'>
            <span className='fc-title'>My Favorites</span>
            {favourites.length > 0 ? (
                <div className='bookmark'>
                    {favourites.map((el) => (
                        <Favourites key={el.id} item={el} onAdd={onAdd} onRemove={onRemove}
                                    addFavourites={addFavourites} deleteFavourites={deleteFavourites}
                                    onItemClick={handleItemCardClick} callback={callback} setCallback={setCallback} />
                    ))}
                </div>
            ) : (
                <div className='empty'>
                    <h3>There are no favorites</h3>
                </div>
            )}
            {/*<div className="second-main-container">*/}
            {/*    <h2>You Also Like It</h2>*/}
            {/*    <div className="recommendation-container">*/}
            {/*        {relatedProducts.map(product => (*/}
            {/*            <div key={product.id} className="recommendation-item">*/}
            {/*                <img src={"../img/"+product.img} alt={product.title}/>*/}
            {/*                <h3>{product.title}</h3>*/}
            {/*                /!*<p>{product.category}</p>*!/*/}
            {/*                <b>{product.price} KZT</b>*/}
            {/*                /!*<div className='add-to-cart' onClick={() => onAdd(product)}> <FiShoppingCart/> </div>*!/*/}
            {/*                /!*{addFavourites ? (isFavourite ? <AiFillHeart className='fav' onClick={() => handleFavouriteClick(product)} /> : <AiOutlineHeart className='fav' onClick={() => handleFavouriteClick(product)} />) : null}*!/*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Bookmark;
