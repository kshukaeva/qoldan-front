import React, {useState} from 'react';

const MyOrders = ({userData }) => {

  const [orderStatus, setOrderStatus] = useState('all');
  const handleOrderStatusChange = (status) => {
    setOrderStatus(status);
  };
  const filteredOrders = userData.orders.filter(
      (order) => orderStatus === 'all' || order.status === orderStatus
  );
  return (
    <div>
      <h3>My Orders</h3>
      <div className='order-filter'>
        <div className='status-cards'>
          <div className={`status-card ${orderStatus === 'all' ? 'active' : ''}`}
            onClick={() => handleOrderStatusChange('all')}>
            All
          </div>
          <div className={`status-card ${orderStatus === 'progress' ? 'active' : ''}`}
            onClick={() => handleOrderStatusChange('progress')}>
            In Progress
          </div>
          <div className={`status-card ${orderStatus === 'completed' ? 'active' : ''}`}
            onClick={() => handleOrderStatusChange('completed')}>
            Completed
          </div>
        </div>
      </div>
      {filteredOrders.map((order) => (
            <div className='list-of-orders' key={order.id}>
              <div className='order-info'>
                <b>Order ID: {order.id}</b>
                <p>Date: {order.date}</p>
              </div>
              <div className='card-one-product'>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.name}>
                      <img src={'../img/' + item.imageUrl} alt={item.name} />
                      <p>{item.name}</p>
                      <b>KZT {item.price}</b>
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
