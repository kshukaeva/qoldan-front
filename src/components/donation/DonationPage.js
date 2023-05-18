import React, { useState } from 'react';
import { BsFilterRight, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import organizationsData from './organizations.json';
import './DonationPage.css';
import {HiLocationMarker} from 'react-icons/hi';
const DonationPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Extracting unique categories from organizationsData
    const categories = organizationsData.reduce(
        (acc, organization) =>
            acc.concat(
                organization.acceptedItems.filter(
                    (item) => !acc.includes(item)
                )
            ),
        []
    );

    // Filtering organizations based on the selected filters
    const filteredOrganizations = selectedFilters.length
        ? organizationsData.filter((organization) =>
            selectedFilters.every((filter) =>
                organization.acceptedItems.includes(filter)
            )
        )
        : organizationsData;

    // Sorting organizations from newest to oldest
    const sortedOrganizations = filteredOrganizations.sort(
        (a, b) => a.id - b.id
    );

    // Handler for changing the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handler for toggling the selected filter
    const handleFilterToggle = (category) => {
        setSelectedFilters((prevFilters) => {
            if (prevFilters.includes(category)) {
                return prevFilters.filter((filter) => filter !== category);
            } else {
                return [...prevFilters, category];
            }
        });
    };

    // Handler for clearing all filters
    const handleClearFilters = () => {
        setSelectedFilters([]);
    };

    return (
        <div className="donation-page">
            <div className="donation-search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by Organization, Category or ..."
                />
                <div className="icons">
                    <BsFilterRight
                        className={`filter-icon ${filterOpen ? 'active' : ''}`}
                        onClick={() => setFilterOpen(!filterOpen)}
                    />
                    <BsSearch className="search-icon" />
                </div>
            </div>
            {filterOpen && (
                <div className="filter-options">
                    <h3>Filter by Category:</h3>
                    <ul>
                        <li
                            className={selectedFilters.length === 0 ? 'active' : ''}
                            onClick={handleClearFilters}
                        >
                            All
                        </li>
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className={selectedFilters.includes(category) ? 'active' : ''}
                                onClick={() => handleFilterToggle(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="organizations-list">
                {sortedOrganizations.map((organization, index) => (
                    <div className="organization-card" key={index}>
                        <div className='organization-card-left'>
                            <img src={'../img/' + organization.imageUrl} alt="organization-icon"/>
                            <div className='organization-card-left-info'>
                                <Link to={`/organization/${organization.id}`} className="organization-name-link">
                                    <h2>{organization.name}</h2>
                                </Link>
                                <p>{organization.type}</p>
                                <b><HiLocationMarker/>{organization.location}</b>
                            </div>
                        </div>
                        <div className='organization-card-right'>
                            <ul className="accepted-items">
                                {organization.acceptedItems.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationPage;
