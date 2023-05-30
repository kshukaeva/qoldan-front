import React, {useEffect, useState} from 'react';
import './OrganizationDashboard.css';

import {FaBell, FaDonate, FaRegAddressCard} from 'react-icons/fa';
import OrganizationDetails from './OrganizationDetails';
import ManageAnnouncements from './ManageAnnouncements';
import ManageDonations from './ManageDonations';

const OrganizationDashboard = () => {
    const [id, setId] = useState(1);
    const [organizationData, setOrganizationData] = useState({});
    const [displayData, setDisplayData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/organizationsData.json');
                const data = await response.json();
                const organization = data.find((org) => org.id === parseInt(id));
                setOrganizationData(organization);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleDisplayDataChange = (data) => {
        setDisplayData(data);
    };

    return (
        <div className="organization-main-dash">
            <div className="organization-profile-left">
                <div className="organization-profile-dash">
                    <img src={'../img/' + organizationData.imageUrl} alt="organization-icon"/>
                    <p>Welcome,</p>
                    <p>{organizationData.name}!</p>
                    <p className="location">You are located in {organizationData.location}.</p>
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
            </div>
            <div className="organization-content">
                {displayData === 'organizationDetails' && <OrganizationDetails organizationData={organizationData}/>}
                {displayData === 'manageAnnouncements' && <ManageAnnouncements organizationId={id}/>}
                {displayData === 'manageDonations' && <ManageDonations organizationId={id}/>}
            </div>
        </div>
    );
};

export default OrganizationDashboard;