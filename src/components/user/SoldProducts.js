import React, {useState} from 'react';

const SoldProducts = ({ userData}) => {
    const [soldStatus, setSoldStatus] = useState('all');

    const handleSoldStatusChange = (status) => {
        setSoldStatus(status);
    };

    const soldItems = userData.sold.filter(
        (sold) => soldStatus === 'all' || sold.status === soldStatus
    );

    return (
        <div>
            <h3>Sold Products</h3>
            <div className='order-filter'>
                <div className='status-cards'>
                    <div
                        className={`status-card ${soldStatus === 'all' ? 'active' : ''}`}
                        onClick={() => handleSoldStatusChange('all')}
                    >
                        All
                    </div>
                    <div
                        className={`status-card ${soldStatus === 'progress' ? 'active' : ''}`}
                        onClick={() => handleSoldStatusChange('progress')}
                    >
                        In Progress
                    </div>
                    <div
                        className={`status-card ${soldStatus === 'completed' ? 'active' : ''}`}
                        onClick={() => handleSoldStatusChange('completed')}
                    >
                        Completed
                    </div>
                </div>
            </div>
            <div className='sold-products'>
                <ul>
                    {soldItems.map((item) => (
                            <li key={item.name}>
                                <img src={'../img/' + item.imageUrl} alt={item.name} />
                                <div className="product-details">
                                    <p>{item.name}</p>
                                    <b>KZT {item.price}</b>
                                </div>
                                <button>Confirm</button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default SoldProducts;