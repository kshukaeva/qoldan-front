import React, {useEffect, useState} from 'react';
import {getSellOrders, getSoldProducts, putSellConfirm} from "../../api/OrderApi";

const SoldProducts = ({ userData }) => {
    const [confirmedStatus, setConfirmedStatus] = useState(null);
    const [products, setProducts] = useState([{}]);
    const [callback, setCallback] = useState(false);

    const handleStatusChange = (status) => {
        setConfirmedStatus(status);
    };

    const handleSellConfirm = (productId) => {
        putSellConfirm(productId)
            .then((response) => {
                alert(response.data);
                setCallback(!callback);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    };

    useEffect(() => {
        getSellOrders(confirmedStatus)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    }, [callback, confirmedStatus]);

    return (
        <div>
            <h3>Sold Products</h3>
            <div className='order-filter'>
                <div className='status-cards'>
                    <div className={`status-card ${confirmedStatus === null ? 'active' : ''}`}
                         onClick={() => handleStatusChange(null)}>
                        All
                    </div>
                    <div className={`status-card ${confirmedStatus === false ? 'active' : ''}`}
                         onClick={() => handleStatusChange(false)}>
                        In Progress
                    </div>
                    <div className={`status-card ${confirmedStatus === true ? 'active' : ''}`}
                         onClick={() => handleStatusChange(true)}>
                        Completed
                    </div>
                </div>
            </div>
            <div className='sold-products'>
                <ul>
                    {products.map((product) => (
                            <li key={product.id}>
                                <img src={'../img/' + product.img} alt={product.title} />
                                <div className="product-details">
                                    <p>{product.title}</p>
                                    <b>KZT {product.price}</b>
                                </div>
                                {!product.sellConfirmed ? (
                                    <button onClick={() => {handleSellConfirm(product.id)}}>Confirm</button>
                                ) : (
                                    <button disabled>Confirmed</button>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default SoldProducts;