import React, { useState, useEffect } from 'react';
import './UserDashboard.css';

import {FaRegAddressCard} from 'react-icons/fa';
import {MdPayment} from 'react-icons/md';
import {TbHomeEdit} from 'react-icons/tb';
import {CiInboxIn,CiInboxOut} from 'react-icons/ci';
import {BsBoxSeam} from 'react-icons/bs';
import {BiLogOut} from 'react-icons/bi';
import UserDetails from './UserDetails';
import AddressBook from './AddressBook';
import MyProducts from './MyProducts';
import MyOrders from './MyOrders';
import SoldProducts from "./SoldProducts";
const UserDashboard = () => {
    const [userData, setUserData] = useState({});
    const [displayData, setDisplayData] = useState('myProducts');
    const [orderStatus, setOrderStatus] = useState('all');
    const [soldStatus, setSoldStatus] = useState('all');

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

    const handleDisplayDataChange = (data) => {
        setDisplayData(data);
    };

    const handleOrderStatusChange = (status) => {
        setOrderStatus(status);
    };

    const handleSoldStatusChange = (status) => {
        setSoldStatus(status);
    };

    const handleSaveChanges = () => {
        // Retrieve updated values from the input fields
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        // Update the userData state with the new values
        setUserData({
            ...userData,
            firstName,
            lastName,
            email,
            day,
            month,
            year,
        });

    };

    return (
        <div className='user-main-dash'>
            <div className='user-profile-left'>
                <div className='user-profile-dash'>
                    <img src={'../img/' + userData.imageUrl} alt="user-icon"/>
                    <p>Welcome,</p>
                    <p>{userData.firstName}!</p>
                    <p className='email'>Your email address is {userData.email}.</p>
                    <p className='age'>You are {userData.age} years old.</p>
                    <p className='location'>You are located in {userData.city}.</p>
                </div>
                <div className='list-of-separation'>
                    <div className='buttn' onClick={() => handleDisplayDataChange('detailProfile')}><FaRegAddressCard/> My Details</div>
                    <div className='buttn' onClick={() => handleDisplayDataChange('address')}><TbHomeEdit/> Address Book</div>
                    <div className='buttn' onClick={() => handleDisplayDataChange('payment')}><MdPayment/> Payment Method</div>
                </div>
                <div className='list-of-separation'>
                    <div className='buttn' onClick={() => handleDisplayDataChange('myProducts')}><BsBoxSeam/> My Products</div>
                    <div className='buttn' onClick={() => handleDisplayDataChange('orders')}><CiInboxIn/> My Orders</div>
                    <div className='buttn' onClick={() => handleDisplayDataChange('sold')}><CiInboxOut/> Sold Products</div>
                </div>
                <div className='list-of-separation'>
                    <div className='buttn'><BiLogOut/> Sign Out</div>
                </div>
            </div>
            <div className='list-of-products'>
                {displayData === 'detailProfile' && (
                    <UserDetails userData={userData} handleSaveChanges={handleSaveChanges} />
                )}
                {displayData === 'address' && <AddressBook userData={userData} />}
                {displayData === 'myProducts' && <MyProducts userData={userData} />}
                {displayData === 'orders' && (
                    <MyOrders
                        userData={userData}
                        orderStatus={orderStatus}
                        handleOrderStatusChange={handleOrderStatusChange}
                    />
                )}
                {displayData === 'sold' && (
                    <SoldProducts
                        userData={userData}
                        soldStatus={soldStatus}
                        handleSoldStatusChange={handleSoldStatusChange}
                    />
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
