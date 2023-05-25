import React, { useState, useEffect } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';

const ManageCategory = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editMode, setEditMode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/categories.json');
                const data = await response.json();
                setCategoriesData(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteCategory = (categoryId) => {
        // Delete category
    };

    const handleEditCategory = (categoryId, newTitle) => {
        // Edit category
    };

    const handleAddCategory = () => {
        // Add category
    };

    const handleEditIconClick = (categoryId) => {
        setEditMode(categoryId);
    };

    const handleSaveCategory = (categoryId) => {
        // Save category logic
        setEditMode(null); // Exit edit mode
    };

    return (
        <div className="manage-category-container">
            <h3>Manage Category</h3>
            <div className="add-category">
                <div className="centered-content">
                    <h2>Add New Category</h2>
                    <input type="text" value={newCategory} />
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>
            </div>
            <h2>Categories</h2>
            <ul className="category-list">
                {categoriesData.map((category) => (
                    <li className="category-item" key={category.id}>
                        <div className="category-details">
                            {editMode === category.id ? (
                                <input type="text" defaultValue={category.title} />
                            ) : (
                                category.title
                            )}
                        </div>
                        <div className="category-actions">
                            {editMode === category.id ? (
                                <button onClick={() => handleSaveCategory(category.id)}>Save</button>
                            ) : (
                                <span className="edit-icon" onClick={() => handleEditIconClick(category.id)}>
                                    <MdModeEditOutline />
                                </span>
                            )}
                            <span className="delete-icon" onClick={() => handleDeleteCategory(category.id)}>
                                <MdDelete />
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCategory;
