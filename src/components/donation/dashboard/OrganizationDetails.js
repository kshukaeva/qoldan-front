import React, {useEffect, useState} from 'react';
import {putUpdateOrganization} from "../../../api/OrganizationAPI";

const OrganizationDetails = ({ data }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // const [type, setType] = useState(data.type);
    // const [location, setLocation] = useState(data.location);

    const handleSaveChanges = () => {
        // Update the data state with the new values
        data = {
            ...data,
            name,
            description,
        };

        // Perform any additional actions here, such as updating the backend
        putUpdateOrganization(data)
            .then((response) => {
                alert(response.data);
            }).catch((error) => {
                alert(error.response.data);
            }).finally(() => {});

        // Log the updated organization data
        console.log(data);
    };

    useEffect(() => {
        if (data) {
            setName(data.name);
            setDescription(data.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [data])

    return (
        <div className='organization-details'>
            <h3>ORGANIZATION DETAILS</h3>
            <div className='details-form'>
                <div className='form-row'>
                    <label htmlFor='name'>NAME*:</label>
                    <input
                        type='text'
                        id='name'
                        // defaultValue={data.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {/*<div className='form-row'>*/}
                {/*    <label htmlFor='type'>TYPE*:</label>*/}
                {/*    <input*/}
                {/*        type='text'*/}
                {/*        id='type'*/}
                {/*        value={type}*/}
                {/*        onChange={(e) => setType(e.target.value)}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className='form-row'>
                    <label htmlFor='description'>DESCRIPTION*:</label>
                    <input
                        type='text'
                        id='description'
                        // defaultValue={data.description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {/*<div className='form-row'>*/}
                {/*    <label htmlFor='location'>LOCATION*:</label>*/}
                {/*    <input*/}
                {/*        type='text'*/}
                {/*        id='location'*/}
                {/*        value={location}*/}
                {/*        onChange={(e) => setLocation(e.target.value)}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
            <button className='save-changes' onClick={handleSaveChanges}>
                Save Changes
            </button>
        </div>
    );
};

export default OrganizationDetails;