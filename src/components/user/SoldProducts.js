import React from 'react';

const SoldProducts = ({ userData, soldStatus, handleSoldStatusChange }) => {
    const soldItems = userData.sold.filter((sold) => soldStatus === 'all' || sold.status === soldStatus);

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
                    {soldItems &&
                        soldItems.map((item) => (
                            <li key={item.name}>
                                <img src={'../img/' + item.imageUrl} alt={item.name} />
                                <p>{item.name}</p>
                                <b>KZT {item.price}</b>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default SoldProducts;