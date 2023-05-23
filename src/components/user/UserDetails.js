import React from 'react';
import {putUpdateProfile} from "../../api/UserAPI";

const UserDetails = ({ userData }) => {
    const handleSaveChanges = () => {
        userData.firstname = document.getElementById('firstname').value;
        userData.lastname = document.getElementById('lastname').value;
        userData.email = document.getElementById('email').value;
        userData.mobile = document.getElementById('mobile').value;

        putUpdateProfile(userData)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {});
    }

    return (
        <div className='list-of-my-products'>
            <h3>MY DETAILS</h3>
            <div className='details-form'>
                <div className='form-row'>
                    <label htmlFor='firstName'>FIRST NAME*:</label>
                    <input type='text' id='firstname' defaultValue={userData.firstname} />
                </div>
                <div className='form-row'>
                    <label htmlFor='lastName'>LAST NAME*:</label>
                    <input type='text' id='lastname' defaultValue={userData.lastname} />
                </div>
                <div className='form-row'>
                    <label htmlFor='email'>EMAIL ADDRESS*:</label>
                    <input type='email' id='email' defaultValue={userData.email} />
                </div>
                <div className='form-row'>
                    <label htmlFor='mobile'>MOBILE*:</label>
                    <input type='text' id='mobile' defaultValue={userData.mobile} />
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
