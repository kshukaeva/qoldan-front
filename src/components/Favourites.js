import React, {useState} from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';

const Favourites = ({ item, onAdd, onItemClick, isFavourite, addFavourites, deleteFavourites }) =>{
    const [favourite, setFavourite] = useState(isFavourite);

    const handleFavouriteClick = () => {
        if (favourite) {
            addFavourites(item);
        } else {
            deleteFavourites(item.id);
        }
        setFavourite(!favourite);
    };

    const handleItemClick = () => {
        onItemClick(item.id);
    };
  return (
    <div className='fav-item'>
            <div className="item-image-container">
                <img src={"../img/"+item.img} alt={item.title}/>
                {favourite ? (
                    <AiOutlineHeart className='fav' onClick={handleFavouriteClick} />
                ) : (
                    <AiFillHeart className='fav' onClick={handleFavouriteClick} />
                )}
            </div>
            <h2 onClick={handleItemClick}>{item.title}</h2>
            <b>{item.price} KZT</b>
            <FiShoppingCart className='add-to-cart' onClick={() => onAdd(item)} />
    </div>
  )
}

export default Favourites;
