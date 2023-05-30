import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';

const ManageAnnouncements = ({ organizationId }) => {
    const [announcements, setAnnouncements] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('/announcementsData.json');
                const data = await response.json();
                const organizationAnnouncements = data.filter(
                    (announcement) => announcement.organizationId === parseInt(organizationId)
                );
                setAnnouncements(organizationAnnouncements);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnnouncements();
    }, [organizationId]);

    const handleEditAnnouncement = (announcementId) => {
        navigate(`/edit-announcement/${announcementId}`);
    };

    const handleDeleteAnnouncement = (announcementId) => {
        // Perform delete announcement logic
        console.log('Delete announcement:', announcementId);
    };
    const calculateDonationProgress = (currentQuantity, targetQuantity) => {
        const percentage = (currentQuantity / targetQuantity) * 100;
        return Math.round(percentage);
    };

    return (
        <div>
            <h3>Manage Announcements</h3>
            <div className="add-new-announcement">
                <div className="add-new-announcement-button" onClick={() => navigate('/add-announcement')}>
                    <span>Add New Announcement</span>
                </div>
            </div>
            <div className="manage-announcement-card">
                {announcements.map((announcement) => (
                    <div className="manage-announcement-one-card">
                        <div className="manage-announcements-info">
                            <p className="manage-announcements-title">{announcement.title}</p>
                            <div className="donation-progress">
                                <div
                                    className="donation-progress-bar"
                                    style={{ width: `${calculateDonationProgress(announcement.currentQuantity, announcement.targetQuantity)}%` }}
                                >
                                    {calculateDonationProgress(announcement.currentQuantity, announcement.targetQuantity)}%
                                </div>
                            </div>
                        </div>
                        <div className="my-announcement-edit">
                            <AiOutlineEdit
                                className="announcement-edit-icon"
                                onClick={() => handleEditAnnouncement(announcement.id)}
                            />
                            <MdDeleteOutline
                                className="announcement-delete-icon"
                                onClick={() => handleDeleteAnnouncement(announcement.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageAnnouncements;
