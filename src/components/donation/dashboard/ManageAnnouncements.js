import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AiOutlineEdit} from 'react-icons/ai';
import {MdDeleteOutline} from 'react-icons/md';
import {getMyAnnouncements} from "../../../api/DonationAnnouncementAPI";

const ManageAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [status, setStatus] = useState(null);
    const [callback, setCallback] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getMyAnnouncements(status)
            .then((response) => {
                setAnnouncements(response.data);
            }).catch((error) => {
                alert(error.response.data);
            });
    }, [callback]);

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
                                    style={{ width: `${calculateDonationProgress(announcement.quantityCollected, announcement.quantityNeeded)}%` }}
                                >
                                    {calculateDonationProgress(announcement.quantityCollected, announcement.quantityNeeded)}%
                                </div>
                            </div>
                        </div>
                        <div className="my-announcement-edit">
                            <AiOutlineEdit
                                className="announcement-edit-icon"
                                onClick={() => handleEditAnnouncement(announcement.id)}
                            />
                            {/*<MdDeleteOutline*/}
                            {/*    className="announcement-delete-icon"*/}
                            {/*    onClick={() => handleDeleteAnnouncement(announcement.id)}*/}
                            {/*/>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageAnnouncements;