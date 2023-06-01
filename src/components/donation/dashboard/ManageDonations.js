import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getDonationsToOrganization, putDonationStatus} from "../../../api/DonationAPI";
import {getImageUrl} from "../../../api/ImageAPI";

const ManageDonations = () => {
    const navigate = useNavigate();

    const [donations, setDonations] = useState([]);
    const [callback, setCallback] = useState(false);

    const navigateToAnnouncement = (announcementId) => {
        navigate(`/announcement/${announcementId}`);
    };

    const handleDonation = (donationId, status) => {
        // Implement accept logic here
        putDonationStatus(donationId, status)
            .then((response) => {
                setCallback(!callback);
            }).catch((error) => {
                alert(error.response.data);
            });
    };

    useEffect(() => {
        getDonationsToOrganization()
            .then((response) => {
                setDonations(response.data);
            }).catch((error) => {
                alert(error.response.data);
            })
    }, [callback]);

    return (<div className="manage-donations-container">
        <h3>Manage Donations</h3>
        {donations.length === 0 ? (<p>No donations found for this organization.</p>) : (
            <ul className="donation-list">
                {donations.map((donation) => (<li className="donation-item" key={donation.id}>
                    <div className='img-container'>
                        <img src={getImageUrl(donation.itemImageId)} alt="Donation"/>
                    </div>
                    <div className="donation-details">
                        <p>Username: {donation.username}</p>
                        <b onClick={() => navigateToAnnouncement(donation.announcementId)}>Title: {donation.announcementTitle}</b>
                        <p>Product Name: {donation.itemTitle}</p>
                        <p>Product Description: {donation.itemSummary}</p>
                        <p>Quantity: {donation.quantity}</p>
                    </div>

                    {donation.status === "PENDING" ? (
                        <div className="donation-actions">
                            <button
                                className="accept-btn"
                                onClick={() => handleDonation(donation.id, "CONFIRMED")}
                            >
                                Accept
                            </button>
                            <button
                                className="reject-btn"
                                onClick={() => handleDonation(donation.id, "REJECTED")}
                            >
                                Reject
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </li>))}
            </ul>)}
    </div>);
};

export default ManageDonations;