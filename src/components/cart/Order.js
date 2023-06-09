import React from 'react'
import {FaTrash} from 'react-icons/fa'

const Order = ({item, onDelete,onItemClick}) => {
    const handleItemClick = () => {
        onItemClick(item.id);
    };
  return (
    <div className='item'>
      <img src={"../img/"+item.imageUrl} alt={item.title}/>
      <h2 onClick={handleItemClick}>{item.title}</h2>
      <b>{item.price} KZT</b>
      <FaTrash className='delete-icon' onClick={()=>onDelete(item.id)}/>
    </div>
  )
}

export default Order;
