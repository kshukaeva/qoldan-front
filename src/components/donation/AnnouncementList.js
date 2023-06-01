import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './DonationPage.css';
import {getAnnouncements} from "../../api/DonationAnnouncementAPI";

const AnnouncementList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [callback, setCallback] = useState(false);

    const [status, setStatus] = useState(null);
    const [organizationName, setOrganizationName] = useState(null);

    useEffect(() => {
        getAnnouncements(status, organizationName)
            .then((response) => {
                setAnnouncements(response.data);
            }).catch((error) => {
                alert(error.response.data);
            });

    }, [callback]);

    const calculateDonationProgress = (currentQuantity, targetQuantity) => {
        const percentage = (currentQuantity / targetQuantity) * 100;
        return Math.round(percentage);
    };

    return (
        <div className="announcement-list">
            <h2>List of Announcements</h2>
            {announcements.map((announcement) => (
                <div className="announcement-card" key={announcement.id}>
                    <div className="announcement-card-left">
                        <img src={"../img/organization.jpg"} alt="Announcement"/>
                        <div className="announcement-card-left-info">
                            <h3>{announcement.title}</h3>
                            <p>{announcement.organization}</p>
                            <p className="announcement-category">{announcement.category}</p>
                            <div className="donation-progress">
                                <div
                                    className="donation-progress-bar"
                                    style={{ width: `${calculateDonationProgress(announcement.quantityCollected, announcement.quantityNeeded)}%` }}
                                >
                                    {calculateDonationProgress(announcement.quantityCollected, announcement.quantityNeeded)}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="announcement-card-right">
                        <Link className="announcement-view-details" to={`/announcement/${announcement.id}`}>
                            Donate
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnnouncementList;