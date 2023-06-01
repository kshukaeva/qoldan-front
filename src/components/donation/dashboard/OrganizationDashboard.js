import React, {useEffect, useState} from 'react';
import './OrganizationDashboard.css';

import {FaBell, FaDonate, FaRegAddressCard} from 'react-icons/fa';
import OrganizationDetails from './OrganizationDetails';
import ManageAnnouncements from './ManageAnnouncements';
import ManageDonations from './ManageDonations';
import {BiLogOut} from "react-icons/bi";
import {handleLogout} from "../../../api/useApiCall";
import {useNavigate} from "react-router-dom";
import {getMyOrganization} from "../../../api/OrganizationAPI";

const OrganizationDashboard = () => {
    const storedDisplayData = localStorage.getItem('displayData');

    const [id, setId] = useState(1);
    const [organizationData, setOrganizationData] = useState({});
    const [displayData, setDisplayData] = useState(storedDisplayData ? storedDisplayData : '');
    const [callback, setCallback] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/organizationsData.json');
    //             const data = await response.json();
    //             const organization = data.find((org) => org.id === parseInt(id));
    //             setOrganizationData(organization);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //
    //     fetchData();
    // }, [id]);
    useEffect(() => {
        getMyOrganization()
            .then((response) => {
                setOrganizationData(response.data);
            }).catch((error) => {
                alert(error.response.data);
            }).finally(() => {});

    }, [callback]);

    const handleDisplayDataChange = (data) => {
        setDisplayData(data);
    };

    useEffect(() => {
        localStorage.setItem('displayData', displayData);
    }, [displayData]);

    return (
        <div className="organization-main-dash">
            <div className="organization-profile-left">
                <div className="organization-profile-dash">
                    <img src={'../img/organization.jpg'} alt="organization-icon"/>
                    <p>Welcome,</p>
                    <p>{organizationData.name}!</p>
                    {/*<p className="location">You are located in {organizationData.location}.</p>*/}
                </div>
                <div className="list-of-separation">
                    <div className="buttn" onClick={() => handleDisplayDataChange('organizationDetails')}>
                        <FaRegAddressCard/> Organization Details
                    </div>
                    <div className="buttn" onClick={() => handleDisplayDataChange('manageAnnouncements')}>
                        <FaBell/> Manage Announcements
                    </div>
                    <div className="buttn" onClick={() => handleDisplayDataChange('manageDonations')}>
                        <FaDonate/> Manage Donations
                    </div>
                </div>
                <div className="list-of-separation">
                    <div className='buttn' onClick={() => handleLogout(navigate)}>
                        <BiLogOut/> Sign Out
                    </div>
                </div>
            </div>
            <div className="organization-content">
                {displayData === 'organizationDetails' && <OrganizationDetails data={organizationData}/>}
                {displayData === 'manageAnnouncements' && <ManageAnnouncements />}
                {displayData === 'manageDonations' && <ManageDonations />}
            </div>
        </div>
    );
};

export default OrganizationDashboard;