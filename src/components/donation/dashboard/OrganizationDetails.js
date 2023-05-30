import React, { useState } from 'react';

const OrganizationDetails = ({ organizationData }) => {
    const [name, setName] = useState(organizationData.name);
    const [type, setType] = useState(organizationData.type);
    const [description, setDescription] = useState(organizationData.description);
    const [location, setLocation] = useState(organizationData.location);

    const handleSaveChanges = () => {
        // Update the organizationData state with the new values
        const updatedOrganizationData = {
            ...organizationData,
            name,
            type,
            description,
            location,
        };

        // Perform any additional actions here, such as updating the backend

        // Log the updated organization data
        console.log(updatedOrganizationData);
    };

    return (
        <div className='organization-details'>
            <h3>ORGANIZATION DETAILS</h3>
            <div className='details-form'>
                <div className='form-row'>
                    <label htmlFor='name'>NAME*:</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='type'>TYPE*:</label>
                    <input
                        type='text'
                        id='type'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='description'>DESCRIPTION*:</label>
                    <input
                        type='text'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='location'>LOCATION*:</label>
                    <input
                        type='text'
                        id='location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
            </div>
            <button className='save-changes' onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default OrganizationDetails;