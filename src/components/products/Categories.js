import React, { useState, useEffect } from 'react';

const Categories = ({ chooseCategory }) => {
    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/categories.json');
                const data = await response.json();
                setCategoriesData(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='categories-container'>
            <div className='categories' onClick={() => chooseCategory('all')}>
                <span>All</span>
            </div>
            {categoriesData.map((el) => (
                <div className='categories' key={el.id} onClick={() => chooseCategory(el.id)}>
                    <span>{el.title}</span>
                </div>
            ))}
        </div>
    );
};

export default Categories;
