import React, {useEffect, useState} from 'react'
import {FaTrash} from 'react-icons/fa'
import {getImageUrl} from "../../api/ImageAPI";
import {noImageUrl} from "../../helper/ImageHelper";

const Order = ({ item, onDelete, onItemClick, callback, setCallback }) => {
    const [image, setImage] = useState(noImageUrl);

    const handleItemClick = () => {
        onItemClick(item.id);
    };

    useEffect(() => {
        setImage(getImageUrl(item.imageId));
    }, []);

    return (
        <div className='item'>
            <img src={image} alt={item.title}/>
            <h2 onClick={handleItemClick}>{item.title}</h2>
            <b>{item.price} KZT</b>
            <FaTrash className='delete-icon' onClick={() => onDelete(item.id, callback, setCallback)}/>
        </div>
    )
}

export default Order;
