import React, { useState } from 'react';

const UserDetails = ({ userData }) => {
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [email, setEmail] = useState(userData.email);
    const [day, setDay] = useState(userData.day);
    const [month, setMonth] = useState(userData.month);
    const [year, setYear] = useState(userData.year);

    const handleSaveChanges = () => {
        // Update the userData state with the new values
        const updatedUserData = {
            ...userData,
            firstName,
            lastName,
            email,
            day,
            month,
            year,
        };

        // Perform any additional actions here, such as updating the backend

        // Log the updated user data
        console.log(updatedUserData);
    };

    return (
        <div className='list-of-my-products'>
            <h3>MY DETAILS</h3>
            <div className='details-form'>
                <div className='form-row'>
                    <label htmlFor='firstName'>FIRST NAME*:</label>
                    <input
                        type='text'
                        id='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='lastName'>LAST NAME*:</label>
                    <input
                        type='text'
                        id='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='email'>EMAIL ADDRESS*:</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='dateOfBirth'>DATE OF BIRTH*:</label>
                    <div className='date-inputs'>
                        <input
                            type='number'
                            id='day'
                            placeholder='Day'
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                        />
                        <input
                            type='number'
                            id='month'
                            placeholder='Month'
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                        <input
                            type='number'
                            id='year'
                            placeholder='Year'
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
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
