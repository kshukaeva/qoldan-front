import React from 'react';

const AddressBook = ({ userData, handleSaveChanges }) => {
    return (
        <div className='list-of-my-products'>
            <h3>MY ADDRESS</h3>
            <div className='details-form'>
                <div className='form-row'>
                    <label htmlFor='city'>City*:</label>
                    <input type='text' id='city' defaultValue={userData.city} />
                </div>
                <div className='form-row'>
                    <label htmlFor='address'>Address*:</label>
                    <input type='text' id='address' defaultValue={userData.address} />
                </div>
                <div className='form-row'>
                    <label htmlFor='buildingName'>Building Name*:</label>
                    <input type='text' id='buildingName' defaultValue={userData.buildingName} />
                </div>
                <div className='form-row'>
                    <label htmlFor='apartment'>Apartment:</label>
                    <input type='text' id='apartment' defaultValue={userData.apartment} />
                </div>
                <div className='form-row'>
                    <label htmlFor='entrance'>Entrance:</label>
                    <input type='text' id='entrance' defaultValue={userData.entrance} />
                </div>
                <div className='form-row'>
                    <label htmlFor='details'>Details:</label>
                    <input type='text' id='details' defaultValue={userData.details} />
                </div>
            </div>
            <button className='save-changes' onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default AddressBook;
