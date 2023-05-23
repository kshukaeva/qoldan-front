import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={i === currentPage ? 'active' : ''}>
                    <button onClick={() => handlePageClick(i)}>{i}</button>
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <ul className="pagination">
            {renderPageNumbers()}
        </ul>
    );
}

export default Pagination;
