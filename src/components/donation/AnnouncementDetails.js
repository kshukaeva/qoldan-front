import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './DonationPage.css';
import Uploaimagetest from "../core/Uploaimagetest";

const AnnouncementDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState({});
    const [loading, setLoading] = useState(true);
    const [donationQuantity, setDonationQuantity] = useState(0);
    const [organization, setOrganization] = useState({});
    const [category, setCategory] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [announcementResponse, organizationResponse, categoryResponse] = await Promise.all([
                    fetch('/announcementsData.json'),
                    fetch('/organizationsData.json'),
                    fetch('/categories.json')
                ]);

                const [announcementData, organizationData, categoryData] = await Promise.all([
                    announcementResponse.json(),
                    organizationResponse.json(),
                    categoryResponse.json()
                ]);

                const selectedAnnouncement = announcementData.find((item) => item.id === parseInt(id));
                setAnnouncement(selectedAnnouncement);

                const selectedOrganization = organizationData.find((org) => org.id === selectedAnnouncement.organizationId);
                setOrganization(selectedOrganization);

                const selectedCategory = categoryData.find((cat) => cat.id === selectedAnnouncement.categoryId);
                setCategory(selectedCategory);

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const calculateDonationProgress = (currentQuantity, targetQuantity) => {
        const percentage = (currentQuantity / targetQuantity) * 100;
        return Math.round(percentage);
    };

    const handleDonateClick = () => {
        console.log(`Donating ${donationQuantity} products for announcement ID ${announcement.id}`);
        navigate(`/donate-success`);
    };

    const handleDonationQuantityChange = (event) => {
        setDonationQuantity(Number(event.target.value));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="announcement-details">
            <div className="announcement-first-main-container">
                <div className="announcement-first-sub-container">
                    <div className="announcement-main-image-container">
                        <img src={`../img/${organization.imageUrl}`} alt="Announcement"/>
                    </div>
                </div>
                <div className="announcement-second-sub-container">
                    <h2>{announcement.title}</h2>
                    <p>{announcement.description}</p>
                    <p>Organization: {organization.name}</p>
                    <p>Category: {category.title}</p>
                    <p>
                        Donated: {announcement.currentQuantity}/{announcement.targetQuantity}
                    </p>
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
            <form className="announcement-second-main-container" onSubmit={handleDonateClick}>
                <h2>Add Donation</h2>
                <div className="announcement-second-first-sub-container">
                    <div className="announcement-second-details">
                        <label>
                            Product Name:
                            <input type="text"/>
                        </label>
                        <label>
                            Product Description:
                            <input type="text"/>
                        </label>
                        <label>
                            Quantity to Donate:
                            <input
                                type="number"
                                value={donationQuantity}
                                onChange={handleDonationQuantityChange}
                                min={1}
                                max={announcement.targetQuantity - announcement.currentQuantity}
                            />
                        </label>
                    </div>
                    <div className="announcement-second-image">
                        <label className="upload-image-label">
                            <Uploaimagetest/>
                        </label>
                    </div>
                </div>
                <div className="announcement-second-second-sub-container">
                    <button type="submit">Donate</button>
                </div>
            </form>
        </div>
    );
};

export default AnnouncementDetails;