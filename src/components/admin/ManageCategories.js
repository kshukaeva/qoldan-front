import React, { useState, useEffect } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import {deleteCategory, getCategories, postCategory, putCategory} from "../../api/CategoryAPI";

const ManageCategories = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [title, setTitle] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [callback, setCallback] = useState(false);

    const handleDeleteCategory = (categoryId) => {
        deleteCategory(categoryId)
            .then((response) => {
                // alert(response.data);
                setCallback(!callback);
            }).catch((error) => {
                alert(error.response.data);
            });
    };

    const handleAddCategory = () => {
        postCategory(newCategory)
            .then((response) => {
                console.log(response.data);
                setCallback(!callback);
            }).catch((error) => {
                alert(error.response.data);
            });
        setNewCategory('');
    };

    const handleEditIconClick = (categoryId, categoryTitle) => {
        setEditMode(categoryId);
        setTitle(categoryTitle);
    };

    const handleSaveCategory = (categoryId) => {
        putCategory({ id: categoryId, title })
            .then((response) => {
                // alert(response.data);
                setCallback(!callback);
            }).catch((error) => {
            alert(error.response.data);
        });
        setEditMode(null);
        setTitle(null);
    };

    useEffect(() => {
        getCategories()
            .then((response) => {
                setCategoriesData(response.data);
            }).catch((error) => {
                alert(error.response.data);
            });
    }, [callback]);

    return (
        <div className="manage-category-container">
            <h3>Manage Category</h3>
            <div className="add-category">
                <div className="centered-content">
                    <h2>Add New Category</h2>
                    <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>
            </div>
            <h2>Categories</h2>
            <ul className="category-list">
                {categoriesData.map((category) => (
                    <li className="category-item" key={category.id}>
                        <div className="category-details">
                            {editMode === category.id ? (
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            ) : (
                                category.title
                            )}
                        </div>
                        <div className="category-actions">
                            {editMode === category.id ? (
                                <button onClick={() => handleSaveCategory(category.id)}>Save</button>
                            ) : (
                                <span className="edit-icon" onClick={() => handleEditIconClick(category.id, category.title)}>
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

export default ManageCategories;