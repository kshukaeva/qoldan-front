import React, {useEffect, useState} from 'react';
import {getPurchaseOrders, putPurchaseOrderConfirm, putPurchaseProductConfirm} from "../../api/OrderApi";
import {getImageUrl} from "../../api/ImageAPI";

const MyOrders = ({ userData }) => {
    const [status, setStatus] = useState(null);
    const [orders, setOrders] = useState([{
        products: [{}]
    }]);
    const [callback, setCallback] = useState(false);

    const handleOrderStatusChange = (status) => {
        setStatus(status);
    };

    const handlePurchaseProductConfirm = (productId) => {
        putPurchaseProductConfirm(productId)
            .then((response) => {
                alert(response.data);
                setCallback(!callback);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    }

    const handlePurchaseOrderConfirm = (orderId) => {
        putPurchaseOrderConfirm(orderId)
            .then((response) => {
                alert(response.data);
                setCallback(!callback);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    }

    useEffect(() => {
        getPurchaseOrders(status)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    }, [callback, status])

    return (
        <div>
            <h3>My Orders</h3>
            <div className='order-filter'>
                <div className='status-cards'>
                    <div className={`status-card ${status === null ? 'active' : ''}`}
                         onClick={() => handleOrderStatusChange(null)}>
                        All
                    </div>
                    <div className={`status-card ${status === 'PENDING' ? 'active' : ''}`}
                         onClick={() => handleOrderStatusChange('PENDING')}>
                        In Progress
                    </div>
                    <div className={`status-card ${status === 'CONFIRMED' ? 'active' : ''}`}
                         onClick={() => handleOrderStatusChange('CONFIRMED')}>
                        Completed
                    </div>
                </div>
            </div>
            {orders.map((order) => (
                <div className='list-of-orders' key={order.id}>
                    <div className='order-info'>
                        <b>Order ID: {order.id}</b>
                        <p>Date: {new Date(order.timestamp).toLocaleString()}</p>
                    </div>
                    <div className='order-info'>
                        <b>Address: {order.address}</b>
                    </div>
                    <div className='order-info'>
                        <b>Total: KZT {order.total}</b>
                    </div>
                    <div className='card-one-product sold-products'>
                        <div>
                            {order.status == 'PENDING' ? (
                                <button onClick={() => {handlePurchaseOrderConfirm(order.id)}}>Confirm</button>
                            ) : (
                                <button disabled>Confirmed</button>
                            )}
                            <br />
                            <br />
                        </div>
                        <ul>
                            {order.products.map((product) => (
                                <li key={product.title}>
                                    <img src={getImageUrl(product.imageId)} alt={product.title}/>
                                    <div className="product-details">
                                        <p>{product.title}</p>
                                        <b>KZT {product.price}</b>
                                    </div>
                                    {!product.buyConfirmed ? (
                                        <button onClick={() => {handlePurchaseProductConfirm(product.id)}}>Confirm</button>
                                    ) : (
                                        <button disabled>Confirmed</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
