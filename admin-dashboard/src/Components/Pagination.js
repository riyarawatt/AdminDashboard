import React from 'react';
import '../App.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (page) => {
        if (page === 'first' || page === 'previous' || page === 'next' || page === 'last') {
            onPageChange(page);
        } else {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination-container">
            <span className="page-info"><b>{`Page ${currentPage} of ${totalPages}`}</b></span>
            <button onClick={() => handlePageChange('first')}>{'<<'}</button>
            <button onClick={() => handlePageChange('previous')}>{'<'}</button>
            <div className="page-numbers">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={page === currentPage ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button onClick={() => handlePageChange('next')}>{'>'}</button>
            <button onClick={() => handlePageChange('last')}>{'>>'}</button>
        </div>
    );
};

export default Pagination;