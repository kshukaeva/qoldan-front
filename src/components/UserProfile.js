import React, { useState } from 'react';
// import './UserProfile.css';

function UserProfile() {
  const [profileImg, setProfileImg] = useState(null); // keep track of profile photo
  const [userInfo, setUserInfo] = useState({ // keep track of user information
    name: 'John',
    email: 'test@gmail.com',
    phone: '',
    address: '',
  });
  const [activeOrders, setActiveOrders] = useState([]); // keep track of active orders
  const [inactiveOrders, setInactiveOrders] = useState([]); // keep track of inactive orders
  const [deletedProducts, setDeletedProducts] = useState([]); // keep track of deleted products
  const [pendingOrders, setPendingOrders] = useState([]); // keep track of pending orders
  const [orderHistory, setOrderHistory] = useState([]); // keep track of order history

  const handleProfileImgChange = (event) => {
    setProfileImg(event.target.files[0]); // update the profile photo when user uploads a new one
  }

  const handleUserInfoChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value }); // update user information when user edits them
  }

  const handleDeleteProduct = (productId) => {
    // move the product with the given ID from active orders to deleted products
    const deletedProduct = activeOrders.find(order => order.id === productId);
    setActiveOrders(activeOrders.filter(order => order.id !== productId));
    setDeletedProducts([...deletedProducts, deletedProduct]);
  }

  const handlePendingOrder = (productId) => {
    // move the product with the given ID from pending orders to order history
    const completedOrder = pendingOrders.find(order => order.id === productId);
    setPendingOrders(pendingOrders.filter(order => order.id !== productId));
    setOrderHistory([...orderHistory, completedOrder]);
  }

  return (
      <div className="UserProfile">
        <div className="UserProfile-header">
          <div className="UserProfile-profileImg">
            {profileImg ? (
                <img src={URL.createObjectURL(profileImg)} alt="Profile" />
            ) : (
                <div className="UserProfile-defaultProfileImg"></div>
            )}
            <input type="file" onChange={handleProfileImgChange} accept="image/*" />
          </div>
          <div className="UserProfile-userInfo">
            <h1>{userInfo.name}</h1>
            <label>
              Email:
              <input type="email" name="email" value={userInfo.email} onChange={handleUserInfoChange} />
            </label>
            <label>
              Phone:
              <input type="tel" name="phone" value={userInfo.phone} onChange={handleUserInfoChange} />
            </label>
            <label>
              Address:
              <textarea name="address" value={userInfo.address} onChange={handleUserInfoChange} />
            </label>
          </div>
        </div>
        <div className="UserProfile-tabs">
          <button className="UserProfile-tab active">Active Orders ({activeOrders.length})</button>
          <button className="UserProfile-tab">Inactive Orders ({inactiveOrders.length})</button>
          <button className="UserProfile-tab">Deleted Products ({deletedProducts.length})</button>
          <button className="UserProfile-tab">Pending Orders ({pendingOrders.length})</button>
          <button className="UserProfile-tab">Order History ({orderHistory.length})</button>
        </div>
        <div className="UserProfile-content">
          {activeOrders.map(order => (
              <div key={order.id} className="UserProfile-productCard">
                <img src={order.image} alt={order.title} />
                <h2>{order.title}</h2>
                <p>{order.description}</p>
                <button onClick={() => handleDeleteProduct(order.id)}>Delete</button>
              </div>
          ))}
          {pendingOrders.map(order => (
              <div key={order.id} className="UserProfile-pendingOrder">
                <img src={order.image} alt={order.title} />
                <div>
                  <h2>{order.title}</h2>
                  <p>{order.description}</p>
                  <p>Price: ${order.price}</p>
                  <p>Delivery date: {order.deliveryDate}</p>
                </div>
                <button onClick={() => handlePendingOrder(order.id)}>Mark as completed</button>
              </div>
          ))}
          {orderHistory.map(order => (
              <div key={order.id} className="UserProfile-orderHistory">
                <img src={order.image} alt={order.title} />
                <div>
                  <h2>{order.title}</h2>
                  <p>{order.description}</p>
                  <p>Price: ${order.price}</p>
                  <p>Delivery date: {order.deliveryDate}</p>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default UserProfile;