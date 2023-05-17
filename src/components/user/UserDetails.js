import React from 'react';

const UserDetails = ({ userData, handleSaveChanges }) => {
    return (
        <div className='list-of-my-products'>
            <h3>MY DETAILS</h3>
            <div className='details-form'>
                <div className='form-row'>
                    <label htmlFor='firstName'>FIRST NAME*:</label>
                    <input type='text' id='firstName' defaultValue={userData.firstName} />
                </div>
                <div className='form-row'>
                    <label htmlFor='lastName'>LAST NAME*:</label>
                    <input type='text' id='lastName' defaultValue={userData.lastName} />
                </div>
                <div className='form-row'>
                    <label htmlFor='email'>EMAIL ADDRESS*:</label>
                    <input type='email' id='email' defaultValue={userData.email} />
                </div>
                <div className='form-row'>
                    <label htmlFor='dateOfBirth'>DATE OF BIRTH*:</label>
                    <div className='date-inputs'>
                        <input type='number' id='day' placeholder='Day' defaultValue={userData.day} />
                        <input type='number' id='month' placeholder='Month' defaultValue={userData.month} />
                        <input type='number' id='year' placeholder='Year' defaultValue={userData.year} />
                    </div>
                </div>
            </div>
            <button className='save-changes' onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default UserDetails;
