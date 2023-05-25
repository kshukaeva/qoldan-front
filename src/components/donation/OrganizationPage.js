import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiLocationMarker } from 'react-icons/hi';

const OrganizationPage = () => {
    const { id } = useParams(); // Retrieve the organization ID from the URL parameter
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/organizationsData.json');
                const data = await response.json();
                const foundOrganization = data.find((org) => org.id === parseInt(id));
                setOrganization(foundOrganization);
            } catch (error) {
                console.error('Error fetching organization:', error);
            }
        };

        fetchData();
    }, [id]);

    // Handle the case when organization is not found or still loading
    if (!organization) {
        return <div>Loading organization...</div>;
    }

    // Render the organization details
    return (
        <div className="organization-page">
            <img src={'../img/' + organization.imageUrl} alt="organization-icon" />
            <h2>{organization.name}</h2>
            <p>{organization.type}</p>
            <p>
                <HiLocationMarker />
                {organization.location}
            </p>
            <ul>
                {organization.acceptedItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button className="donation-button">Donate</button>
        </div>
    );
};

export default OrganizationPage;
