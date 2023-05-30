import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FiHeart, FiShoppingCart, FiUser} from 'react-icons/fi';
import logo from '../../img/logo.png';

export default function Header(props) {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/userData.json');
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (path) => {
        navigate(path);
    };

    const isLoggedIn = localStorage.getItem("token");

    return (
        <header>
            <div className="left-side">
                <img onClick={() => handleClick('/')} src={logo} alt="Logo" className="logo"/>
                <div className="details">
                    <h2 className="name">QOLDAN</h2>
                    <p className="motto">Marketplace for second-hand goods</p>
                </div>
            </div>
            <div className="center">
                <ul className="nav">
                    <li onClick={() => handleClick('/')}>Home</li>
                    <li onClick={() => handleClick('/all')}>Products</li>
                    <li onClick={() => handleClick('/announcements')}>Donation</li>
                </ul>
            </div>
            <div className="right-side">
                <FiShoppingCart onClick={() => handleClick('/cart')} className={`shop-cart-button`}/>
                <FiHeart onClick={() => handleClick('/fav')} className="fav"/>
                {isLoggedIn ? (
                    <img src={'../img/' + 'clothes.jpg'} alt="Logo" onClick={() => handleClick('/user-profile')}
                         className="login-icon"/>
                ) : (
                    <FiUser onClick={() => handleClick('/login')} className="login-icon"/>
                )}
            </div>
        </header>
    );
}
