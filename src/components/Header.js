import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiUser, FiShoppingCart } from 'react-icons/fi';
import logo from '/Users/ksh/qolda/src/img/logo.png';

export default function Header(props) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const isLoggedIn = false;

  return (
    <header>
      <div className="left-side">
        <img onClick={() => handleClick('/')} src={logo} alt="Logo" className="logo" />
        <div className="details">
          <h2 className="name">QOLDAN</h2>
          <p className="motto">Marketplace for second-hand goods</p>
        </div>
      </div>
      <div className="center">
        <ul className="nav">
          <li onClick={() => handleClick('/')}>Home</li>
          <li onClick={() => handleClick('/all')}>Products</li>
          <li onClick={() => handleClick('/contacts')}>Contacts</li>
        </ul>
      </div>
      <div className="right-side">
        <FiShoppingCart onClick={() => handleClick('/cart')} className={`shop-cart-button`} />
        <FiHeart onClick={() => handleClick('/fav')} className="fav" />
        {isLoggedIn ? (
          <FiUser onClick={() => handleClick('/user-profile')} className="login-icon" />
        ) : (
          <FiUser onClick={() => handleClick('/login')} className="login-icon" />
        )}
      </div>
    </header>
  );
}
