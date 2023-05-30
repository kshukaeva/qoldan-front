import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAnnouncement = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/categories.json');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // submission logic
        console.log('Announcement added:', { title, categoryId, description, quantity });
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
                        value={categoryId}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select category...</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
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
                        value={quantity}
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