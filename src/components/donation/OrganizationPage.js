import React from 'react';
import { useParams } from 'react-router-dom';
import organizationsData from './organizations.json';
import {HiLocationMarker} from "react-icons/hi";

const OrganizationPage = () => {
    const { id } = useParams(); // Retrieve the organization ID from the URL parameter

    // Find the organization with the matching ID from the organizationsData
    const organization = organizationsData.find(
        (org) => org.id === parseInt(id)
    );

    // Handle the case when organization is not found
    if (!organization) {
        return <div>Organization not found</div>;
    }

    // Render the organization details
    return (
        <div className='organization-page'>
            <img src={'../img/' + organization.imageUrl} alt="organization-icon"/>
            <h2>{organization.name}</h2>
            <p>{organization.type}</p>
            <p><HiLocationMarker/>{organization.location}</p>
            <ul>
                {organization.acceptedItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button className='donation-button'>Donate</button>
        </div>
    );
};

export default OrganizationPage;
