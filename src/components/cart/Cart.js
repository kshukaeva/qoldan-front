import React, {useEffect, useState} from 'react';
import Order from './Order';
import {useNavigate} from "react-router-dom";
import {getMyCart} from "../api/CartAPI";

const Cart = ({ onDelete }) => {
  const navigate = useNavigate();
  const handleItemCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const [callback, setCallback] = useState(false);
  const [cart, setCart] = useState({
      total: 0,
      products: [{}]
  });

  useEffect(() => {
      getMyCart()
          .then((response) => {
              setCart(response.data);
          })
          .catch((error) => {
              alert(error.response.data);
          })
          .finally(() => {})
  }, [callback]);

  return (
      <div className='main-cart-card'>
        <div className='card-cart'>
          <span className='fc-title'>Shopping Cart</span>
          {cart.products.length > 0 ? (
              <div>
                  <div>
                {cart.products.map((el) => (
                    <Order key={el.id} item={el} onDelete={onDelete} onItemClick={handleItemCardClick}
                           callback={callback} setCallback={setCallback}/>
                ))}
              </div>
                  <div className='cart-price'>
                      <p>Total: {new Intl.NumberFormat().format(cart.total)} KZT</p>
                  </div>
              </div>
          ) : (
              <div className='empty'>
                <h3>There are no goods</h3>
              </div>
          )}
        </div>
          <div className='card-info'>
              <div className='card-delivery'>
                  <span className='card-info-title'>Your information</span>
                  <br/>
                  <label>
                      City
                      <input type="text"/>
                  </label>
                  <label>
                      Address
                      <input type="text"/>
                  </label>
                  <label>
                      Building Name
                      <input type="text"/>
                  </label>
                  <label>
                      Apartment
                      <input type="text"/>
                  </label>
                  <label>
                      Entrance
                      <input type="text"/>
                  </label>
                  <label>
                      Details
                      <input type="text"/>
                  </label>
              </div>
              <div className='card-payment'>
                  <span className='card-info-title'>Payment option</span>
                  <br/>
                  <button>Buy now</button>
              </div>
          </div>
      </div>
  );
};

export default Cart;
