import React from 'react';
import organizationsData from './organizations.json';
import './DonationPage.css';
const DonationPage = () => {
    return (
        <div className="donation-page">
            <h1>Donation Page</h1>
            <div className="organizations-list">
                {organizationsData.map((organization, index) => (
                    <div className="organization" key={index}>
                        <h2>{organization.name}</h2>
                        <ul className="accepted-items">
                            {organization.acceptedItems.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationPage;
