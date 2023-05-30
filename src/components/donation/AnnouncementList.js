import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './DonationPage.css';

const AnnouncementList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('/announcementsData.json');
                const data = await response.json();
                setAnnouncements(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchOrganizations = async () => {
            try {
                const response = await fetch('/organizationsData.json');
                const data = await response.json();
                setOrganizations(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('/categories.json');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnnouncements();
        fetchOrganizations();
        fetchCategories();
    }, []);

    const calculateDonationProgress = (currentQuantity, targetQuantity) => {
        const percentage = (currentQuantity / targetQuantity) * 100;
        return Math.round(percentage);
    };

    const getOrganizationImageUrl = (organizationId) => {
        const organization = organizations.find((org) => org.id === organizationId);
        return organization ? organization.imageUrl : '';
    };

    const getOrganizationName = (organizationId) => {
        const organization = organizations.find((org) => org.id === organizationId);
        return organization ? organization.name : '';
    };

    const getCategoryTitle = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.title : '';
    };

    return (
        <div className="announcement-list">
            <h2>List of Announcements</h2>
            {announcements.map((announcement) => (
                <div className="announcement-card" key={announcement.id}>
                    <div className="announcement-card-left">
                        <img src={`../img/${getOrganizationImageUrl(announcement.organizationId)}`} alt="Announcement"/>
                        <div className="announcement-card-left-info">
                            <h3>{announcement.title}</h3>
                            <p>{getOrganizationName(announcement.organizationId)}</p>
                            <p className="announcement-category">{getCategoryTitle(announcement.categoryId)}</p>
                            <div className="donation-progress">
                                <div
                                    className="donation-progress-bar"
                                    style={{ width: `${calculateDonationProgress(announcement.currentQuantity, announcement.targetQuantity)}%` }}
                                >
                                    {calculateDonationProgress(announcement.currentQuantity, announcement.targetQuantity)}%
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