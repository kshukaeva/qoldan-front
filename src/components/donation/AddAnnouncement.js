import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getCategories} from "../../api/CategoryAPI";
import {postAnnouncement} from "../../api/DonationAnnouncementAPI";

const AddAnnouncement = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantityNeeded, setQuantityNeeded] = useState(0);
    const [category, setCategory] = useState('');

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
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantityNeeded(Number(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // submission logic
        const data = { title, description, quantityNeeded, category }
        postAnnouncement(data)
            .then((response) => {
                navigate('/organization-dashboard');
            }).catch((error) => {
                alert(error.response.data);
            });
    };

    return (
        <div className="add-announcement-container">
            <h3 className="add-announcement-title">Add Announcement</h3>
            <form className="add-announcement-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select category...</option>
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
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control"
                        value={quantityNeeded}
                        onChange={handleQuantityChange}
                        min={1}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn">Add Announcement</button>
                </div>
            </form>
        </div>
    );
};

export default AddAnnouncement;