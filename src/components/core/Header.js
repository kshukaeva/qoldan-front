import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FiGrid, FiHeart, FiShoppingCart, FiUser} from 'react-icons/fi';
import logo from '../../img/logo.png';
import {getUserDashboardUrl} from "../../api/useApiCall";

export default function Header(props) {
    const [userData, setUserData] = useState({});
    const userType = localStorage.getItem('userType');
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
                {userType === 'USER' || userType === null ? (
                    <ul className="nav">
                        <li onClick={() => handleClick('/')}>Home</li>
                        <li onClick={() => handleClick('/all')}>Products</li>
                        <li onClick={() => handleClick('/announcements')}>Donation</li>
                        <li onClick={() => handleClick('/about-us')}>About Us</li>
                    </ul>
                ) : (
                    <ul className="nav">
                        <li onClick={() => handleClick(getUserDashboardUrl())}> <FiGrid/> Dashboard</li>
                    </ul>
                )}

            </div>
            <div className="right-side">
                {userType === 'USER' || userType === null ? (
                    <span>
                        <FiShoppingCart onClick={() => handleClick('/cart')} className={`shop-cart-button`}/>
                        <FiHeart onClick={() => handleClick('/fav')} className="fav"/>
                        {isLoggedIn && userType === 'USER' ? (
                            <img src={'../img/' + 'clothes.jpg'} alt="Logo" onClick={() => handleClick(getUserDashboardUrl())}
                                 className="login-icon"/>
                        ) : (
                            <FiUser onClick={() => handleClick(getUserDashboardUrl())} className="login-icon"/>
                        )}
                    </span>
                ) : (
                    <span></span>
                )}


            </div>
        </header>
    );
}
