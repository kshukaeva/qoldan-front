import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

import { FaRegAddressCard, FaUserFriends } from 'react-icons/fa';
import { BsClipboardData } from 'react-icons/bs';
import { BiCategory} from 'react-icons/bi';
import UserDetails from '../user/UserDetails';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts';
import ManageCategory from './ManageCategory';

const AdminDashboard = () => {
    const [userData, setUserData] = useState({});
    const [displayData, setDisplayData] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/userData.json');
                const data = await response.json();

                // Filter the user data to retrieve the admin user
                const adminUser = data.find((user) => user.role === 'admin');

                setUserData(adminUser);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleDisplayDataChange = (data) => {
        setDisplayData(data);
    };

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="admin-main-dash">
            <div className="admin-profile-left">
                <div className="admin-profile-dash">
                    <img src={'../img/' + userData.imageUrl} alt="user-icon" />
                    <p>Welcome,</p>
                    <p>{userData.firstName}!</p>
                    <p className="email">Your email address is {userData.email}.</p>
                    <p className="location">You are located in {userData.city}.</p>
                </div>
                <div className="list-of-separation">
                    <div className="buttn" onClick={() => handleDisplayDataChange('detailProfile')}>
                        <FaRegAddressCard /> My Details
                    </div>
                    <div className="buttn" onClick={() => handleDisplayDataChange('manageUsers')}>
                        <FaUserFriends /> Manage Users
                    </div>
                    <div className="buttn" onClick={() => handleDisplayDataChange('manageProducts')}>
                        <BsClipboardData /> Manage Products
                    </div>
                    <div className="buttn" onClick={() => handleDisplayDataChange('manageCategory')}>
                        <BiCategory /> Manage Category
                    </div>
                </div>
            </div>
            <div className="admin-content">
                {displayData === 'detailProfile' && <UserDetails userData={userData} />}
                {displayData === 'manageUsers' && <ManageUsers />}
                {displayData === 'manageProducts' && <ManageProducts />}
                {displayData === 'manageCategory' && <ManageCategory />}
            </div>
        </div>
    );
};

export default AdminDashboard;
