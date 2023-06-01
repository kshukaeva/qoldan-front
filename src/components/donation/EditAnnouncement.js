import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getCategories} from "../../api/CategoryAPI";
import {getAnnouncementWithId, putUpdateAnnouncement} from "../../api/DonationAnnouncementAPI";

const EditAnnouncement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState({});
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});

        getAnnouncementWithId(id)
            .then((response) => {
                setAnnouncement(response.data);
                setLoading(false);
            }).catch((error) => {
                alert(error.response.data);
            });
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Perform the update logic here
        console.log('Form submitted:', announcement);
        putUpdateAnnouncement(announcement)
            .then((response) => {
                alert(response.data);
            }).catch((error) => {
                alert(error.response.data);
            });

        navigate("/organization-dashboard");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-announcement-container">
            <h2 className="edit-announcement-title">Edit Announcement</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={announcement.title}
                        onChange={(e) => setAnnouncement({...announcement, title: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        className="form-control"
                        value={announcement.category}
                        onChange={(e) => setAnnouncement({...announcement, category: e.target.value})}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={announcement.description}
                        onChange={(e) => setAnnouncement({...announcement, description: e.target.value})}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control"
                        value={announcement.quantityNeeded}
                        onChange={(e) => setAnnouncement({...announcement, quantityNeeded: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditAnnouncement;