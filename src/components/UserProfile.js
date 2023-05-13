import React from 'react';
import {HiUserCircle} from 'react-icons/hi';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <div className="user-info">
        <div className="user-photo">
          <HiUserCircle />
        </div>
        <div className="user-name">
          <h2>John Doe</h2>
        </div>
        <div className="user-email">
          <p>Email: john.doe@example.com</p>
        </div>
      </div>
      <div className="user-ads">
        <h3>My Ads</h3>
        <div className="active-ads">
          <h4>Active Products</h4>
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </div>
        <div className="non-active-ads">
          <h4>Non Active Products</h4>
          <ul>
            <li>Product 4</li>
            <li>Product 5</li>
          </ul>
        </div>
        <div className="deleted-ads">
          <h4>Deleted Products</h4>
          <ul>
            <li>Product 6</li>
            <li>Product 7</li>
          </ul>
        </div>
      </div>
      <div className="order-history">
        <h3>Order History</h3>
        <ul>
          <li>Order 1</li>
          <li>Order 2</li>
          <li>Order 3</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
