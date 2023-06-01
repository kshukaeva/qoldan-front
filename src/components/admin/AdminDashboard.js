import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

import { FaRegAddressCard, FaUserFriends } from 'react-icons/fa';
import { BsClipboardData, BsPlusCircle } from 'react-icons/bs';
import UserDetails from '../user/UserDetails';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts';
import {handleLogout} from "../../api/useApiCall";
import {BiCategory, BiLogOut} from "react-icons/bi";
import {FiTag} from "react-icons/fi";
import ManageCategories from "./ManageCategories";
import ManageProductTypes from "./ManageProductTypes";
import {getProfile} from "../../api/UserAPI";

const AdminDashboard = () => {
    const storedDisplayData = localStorage.getItem('displayData');
    const [userData, setUserData] = useState({});
    const [displayData, setDisplayData] = useState(storedDisplayData ? storedDisplayData : '');
    const [callback, setCallback] = useState(false);

    const navigate = useNavigate();

    const handleDisplayDataChange = (data) => {
        setDisplayData(data);
    };

    useEffect(() => {
        localStorage.setItem('displayData', displayData);
        getProfile()
            .then((response) => {
                setUserData(response.data);
            }).catch((error) => {
                alert(error.response.data);
            });
    }, [displayData, callback]);

    return (
        <div className="admin-main-dash">
            <div className="admin-profile-left">
                <div className="admin-profile-dash">
                    <img src={'../img/clothes.jpg'} alt="user-icon"/>
                    <p>Welcome,</p>
                    <p>{userData.firstname} {userData.lastname}!</p>
                    <p className='email'>Your email address is {userData.email}.</p>
                    <p className='mobile'>Your mobile phone is {userData.mobile}.</p>
                </div>
                <div className="list-of-separation">
                    <div className="buttn" onClick={() => handleDisplayDataChange('detailProfile')}>
                        <FaRegAddressCard /> My Details
                    </div>
                </div>
                <div className="list-of-separation">
                    {/*<div className="buttn" onClick={() => handleDisplayDataChange('manageUsers')}>*/}
                    {/*    <FaUserFriends /> Manage Users*/}
                    {/*</div>*/}
                    {/*<div className="buttn" onClick={() => handleDisplayDataChange('manageProducts')}>*/}
                    {/*    <BsClipboardData /> Manage Products*/}
                    {/*</div>*/}
                    <div className="buttn" onClick={() => handleDisplayDataChange('manageCategories')}>
                        <BiCategory /> Manage Categories
                    </div>
                    <div className="buttn" onClick={() => handleDisplayDataChange('manageTypes')}>
                        <FiTag /> Manage Types
                    </div>
                </div>
                <div className="list-of-separation">
                    <div className='buttn' onClick={() => handleLogout(navigate)}>
                        <BiLogOut/> Sign Out
                    </div>
                </div>
            </div>
            <div className="admin-content">
                {displayData === 'detailProfile' && <UserDetails userData={userData} callback={callback} setCallback={setCallback}/>}
                {displayData === 'manageUsers' && <ManageUsers />}
                {displayData === 'manageProducts' && <ManageProducts />}
                {displayData === 'manageCategories' && <ManageCategories />}
                {displayData === 'manageTypes' && <ManageProductTypes />}
            </div>
        </div>
    );
};

export default AdminDashboard;
