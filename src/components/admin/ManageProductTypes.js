import React, { useState, useEffect } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import {deleteCategory, getCategories, postCategory, putCategory} from "../../api/CategoryAPI";
import {deleteProductType, getProductTypes, postProductType, putProductType} from "../../api/ProductTypeAPI";

const ManageProductTypes = () => {
    const [typeData, setTypeData] = useState([]);
    const [newType, setNewType] = useState('');
    const [title, setTitle] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [callback, setCallback] = useState(false);

    const handleDeleteType = (typeId) => {
        deleteProductType(typeId)
            .then((response) => {
                // alert(response.data);
                setCallback(!callback);
            }).catch((error) => {
                alert(error.response.data);
            });
    };

    const handleAddType = () => {
        postProductType(newType)
            .then((response) => {
                console.log(response.data);
                setCallback(!callback);
            }).catch((error) => {
                alert(error.response.data);
            });
        setNewType('');
    };

    const handleEditIconClick = (typeId, typeTitle) => {
        setEditMode(typeId);
        setTitle(typeTitle);
    };

    const handleSaveType = (typeId) => {
        putProductType({ id: typeId, title })
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
        getProductTypes()
            .then((response) => {
                setTypeData(response.data);
            }).catch((error) => {
                alert(error.response.data);
            });
    }, [callback]);

    return (
        <div className="manage-category-container">
            <h3>Manage Product Types</h3>
            <div className="add-category">
                <div className="centered-content">
                    <h2>Add New Type</h2>
                    <input type="text" value={newType} onChange={(e) => setNewType(e.target.value)}/>
                    <button onClick={handleAddType}>Add Type</button>
                </div>
            </div>
            <h2>Types</h2>
            <ul className="category-list">
                {typeData.map((type) => (
                    <li className="category-item" key={type.id}>
                        <div className="category-details">
                            {editMode === type.id ? (
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            ) : (
                                type.title
                            )}
                        </div>
                        <div className="category-actions">
                            {editMode === type.id ? (
                                <button onClick={() => handleSaveType(type.id)}>Save</button>
                            ) : (
                                <span className="edit-icon" onClick={() => handleEditIconClick(type.id, type.title)}>
                                    <MdModeEditOutline />
                                </span>
                            )}
                            <span className="delete-icon" onClick={() => handleDeleteType(type.id)}>
                                <MdDelete />
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProductTypes;