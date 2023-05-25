import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';

const ManageUsers = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/userData.json');
                const data = await response.json();
                setUsersData(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteUser = (userID) => {
        // Delete user
    };

    return (
        <div className="manage-users-container">
            <h3>Manage Users</h3>
            <ul className="user-list">
                {usersData.map((user) => (
                    <li className="user-item" key={user.userID}>
                        <div className="user-details">
                            <span>Username: {user.username}</span>
                            <span className="user-email">{user.email}</span>
                        </div>
                        <div className="user-actions">
              <span className="delete-icon" onClick={() => handleDeleteUser(user.userID)}>
                <MdDelete />
              </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageUsers;
