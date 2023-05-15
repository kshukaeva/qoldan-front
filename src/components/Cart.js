import React from 'react';
import Order from './Order';
import {useNavigate, useParams} from "react-router-dom";

const Cart = ({ items, orders, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleItemCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };
  let summa = 0;
  orders.forEach(el => summa+=Number.parseFloat(el.price));

  return (
    <div className='cart'>
      <span className='fc-title'>Мои заказы</span>
      {orders.length > 0 ? (
        <div>
          {orders.map((el) => (
            <Order key={el.id} item={el} onDelete={onDelete} onItemClick={handleItemCardClick} />
          ))}
          <p>Сумма: {new Intl.NumberFormat().format(summa)} KZT</p>
        </div>
      ) : (
        <div className='empty'>
          <h3>Товаров нету</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
