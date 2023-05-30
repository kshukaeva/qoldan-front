import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const ManageDonations = ({ organizationId }) => {
    const [donations, setDonations] = useState([]);
    const [userData, setUserData] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await fetch('/donationData.json');
                const data = await response.json();
                const organizationDonations = data.filter((donation) => donation.organizationId === parseInt(organizationId));
                setDonations(organizationDonations);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await fetch('/userData.json');
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('/announcementsData.json');
                const data = await response.json();
                setAnnouncements(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDonations();
        fetchUserData();
        fetchAnnouncements();
    }, [organizationId]);

    const navigateToAnnouncement = (announcementId) => {
        navigate(`/announcement/${announcementId}`);
    };

    const getUsernameById = (userId) => {
        const user = userData.find((user) => user.userID === userId);
        return user ? user.username : '';
    };

    const getAnnouncementTitleById = (announcementId) => {
        const announcement = announcements.find((announcement) => announcement.id === announcementId);
        return announcement ? announcement.title : '';
    };

    const handleAccept = (donationId) => {
        // Implement accept logic here
        console.log(`Accept donation with ID: ${donationId}`);
    };

    const handleReject = (donationId) => {
        // Implement reject logic here
        console.log(`Reject donation with ID: ${donationId}`);
    };

    return (<div className="manage-donations-container">
            <h3>Manage Donations</h3>
            {donations.length === 0 ? (<p>No donations found for this organization.</p>) : (
                <ul className="donation-list">
                    {donations.map((donation) => (<li className="donation-item" key={donation.id}>
                            <div className='img-container'>
                                <img src={`../img/${donation.image}`} alt="Donation"/>
                            </div>
                            <div className="donation-details">
                                <p>Username: {getUsernameById(donation.userId)}</p>
                                <b onClick={() => navigateToAnnouncement(donation.announcementId)}>Title: {getAnnouncementTitleById(donation.announcementId)}</b>
                                <p>Product Name: {donation.productName}</p>
                                <p>Product Description: {donation.productDescription}</p>
                                <p>Quantity: {donation.quantity}</p>
                            </div>
                            <div className="donation-actions">
                                <button
                                    className="accept-btn"
                                    onClick={() => handleAccept(donation.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="reject-btn"
                                    onClick={() => handleReject(donation.id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>))}
                </ul>)}
        </div>);
};

export default ManageDonations;