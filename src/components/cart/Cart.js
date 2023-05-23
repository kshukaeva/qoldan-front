import React, {useEffect, useState} from 'react';
import Order from './Order';
import {useNavigate} from "react-router-dom";
import {getMyCart, postBookCart} from "../../api/CartAPI";
import {postOrder} from "../../api/OrderApi";

const Cart = ({ onDelete }) => {
  const navigate = useNavigate();
  const handleItemCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const [address, setAddress] = useState({
      city: "",
      address: "",
      building: "",
      apartment: "",
      entrance: "",
      details: ""
  })

  const [callback, setCallback] = useState(false);
  const [cart, setCart] = useState({
      total: 0,
      products: [{}]
  });

  const handleBuyButtonOnClick = () => {
      postBookCart()
          .then((response) => {
              console.log(response.data);
              handleBuyConfirmed("12341");
          })
          .catch((error) => {
              alert(error.response.data);
          })
          .finally(() => {});
  }

  const handleBuyConfirmed = (paymentId) => {
    postOrder(address, paymentId)
        .then((response) => {
            alert(response.data);
        })
        .catch((error) => {
            alert(error.response.data);
        })
        .finally(() => {});
    navigate(`/all`);
  }

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
                      <input type="text"
                             value={address.city}
                             onChange={(e) => setAddress({...address, city: e.target.value})}/>
                  </label>
                  <label>
                      Address
                      <input type="text"
                             value={address.address}
                             onChange={(e) => setAddress({...address, address: e.target.value})}/>
                  </label>
                  <label>
                      Building Name
                      <input type="text"
                             value={address.building}
                             onChange={(e) => setAddress({...address, building: e.target.value})}/>
                  </label>
                  <label>
                      Apartment
                      <input type="text"
                             value={address.apartment}
                             onChange={(e) => setAddress({...address, apartment: e.target.value})}/>
                  </label>
                  <label>
                      Entrance
                      <input type="text"
                             value={address.entrance}
                             onChange={(e) => setAddress({...address, entrance: e.target.value})}/>
                  </label>
                  <label>
                      Details
                      <input type="text"
                             value={address.details}
                             onChange={(e) => setAddress({...address, details: e.target.value})}/>
                  </label>
              </div>
              <div className='card-payment'>
                  <span className='card-info-title'>Payment option</span>
                  <br/>
                  <button onClick={handleBuyButtonOnClick}>Buy now</button>
              </div>
          </div>
      </div>
  );
};

export default Cart;
