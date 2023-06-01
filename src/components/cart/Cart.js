import React, {useEffect, useState} from 'react';
import Order from './Order';
import {useNavigate} from "react-router-dom";
import {getMyCart, postBookCart, postUnbookCart} from "../../api/CartAPI";
import {postOrder} from "../../api/OrderApi";
import Checkout from "./Checkout";
import './CartStyle.css';

const Cart = ({ onDelete }) => {

    const navigate = useNavigate();
    const [currency, setCurrency] = useState('USD')
    const [paymentId, setPaymentId] = useState(null);
    const [success, setSuccess] = useState(false);

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

    const createOrder = (data, actions) => {
        let items = [];
        cart.products.forEach(product => {
            let item = {
                name: product.title,
                quantity: 1,
                unit_amount: {
                    currency_code: currency,
                    value: product.price,
                }
            }
            items.push(item);
        });
        let purchase_units = [{
            items,
            amount: {
                currency_code: currency,
                value: cart.total,
                breakdown: {
                    item_total: {
                        currency_code: currency,
                        value: cart.total
                    }
                }
            },
        }];

        postBookCart()
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                alert(error.response.data);

            })
            .finally(() => {
            });

        return actions.order.create({ purchase_units })
            .then((id) => {
                setPaymentId(id);
                return id;
            });
    }

    const handleBuyConfirmed = (paymentId) => {
        postOrder(address, paymentId)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {
            });
        navigate(`/all`);
    }

    const onApprove = (data, actions) => {
        return actions.order.capture()
            .then(function (details) {
                // const { payer } = details;
                console.log(details);
                setSuccess(true);
            }).catch((error) => {
                console.log("ERROR: ", error);
                unbookCartOnError();
            });
    }

    const onError = (error) => {
        unbookCartOnError();
    }

    const unbookCartOnError = () => {
        postUnbookCart()
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    }

    useEffect(() => {
        if (success) {
            handleBuyConfirmed(paymentId);
            setCallback(!callback);
        }
    }, [success]);

    useEffect(() => {
        getMyCart()
            .then((response) => {
                setCart(response.data);
                setSuccess(false);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {
            })
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
                               onChange={(e) => setAddress({ ...address, city: e.target.value })}/>
                    </label>
                    <label>
                        Address
                        <input type="text"
                               value={address.address}
                               onChange={(e) => setAddress({ ...address, address: e.target.value })}/>
                    </label>
                    <label>
                        Building Name
                        <input type="text"
                               value={address.building}
                               onChange={(e) => setAddress({ ...address, building: e.target.value })}/>
                    </label>
                    <label>
                        Apartment
                        <input type="text"
                               value={address.apartment}
                               onChange={(e) => setAddress({ ...address, apartment: e.target.value })}/>
                    </label>
                    <label>
                        Entrance
                        <input type="text"
                               value={address.entrance}
                               onChange={(e) => setAddress({ ...address, entrance: e.target.value })}/>
                    </label>
                    <label>
                        Details
                        <input type="text"
                               value={address.details}
                               onChange={(e) => setAddress({ ...address, details: e.target.value })}/>
                    </label>
                </div>
                <div className='card-payment'>
                    <span className='card-info-title'>Payment option</span>
                    <br/>
                    <Checkout createOrder={createOrder} onApprove={onApprove} onError={onError}/>
                </div>
            </div>
        </div>
    );
};

export default Cart;
