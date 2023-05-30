import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAnnouncement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState({});
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [targetQuantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await fetch(`/announcementsData.json`);
                const data = await response.json();
                const selectedAnnouncement = data.find(
                    (item) => item.id === parseInt(id)
                );
                setAnnouncement(selectedAnnouncement);
                setTitle(selectedAnnouncement.title);
                setCategory(selectedAnnouncement.categoryId.toString());
                setDescription(selectedAnnouncement.description);
                setQuantity(selectedAnnouncement.targetQuantity);
                setLoading(false);
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

        fetchAnnouncement();
        fetchCategories();
    }, [id]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Perform the update logic here
        console.log('Form submitted:', { title, category, description, targetQuantity });
        navigate(`/announcement/${id}`);
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id.toString()}>
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
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control"
                        value={targetQuantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
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
