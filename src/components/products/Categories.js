import React, { useState, useEffect } from 'react';
import {getCategories} from '../../api/CategoriesAPI'
import useApiCall from "../../api/useApiCall";

const Categories = ({ chooseCategory }) => {
  const [categories] = useState([
    {
      id: null,
      title: 'All'
    },
    {
      id: 1,
      title: 'Clothing and Accessories'
    },
    {
      id: 2,
      title: 'Electronics'
    },
    {
      id: 3,
      title: 'Home and Garden'
    },
    {
      id: 4,
      title: 'Sports and Outdoors'
    },
    {
      id: 5,
      title: 'Books, Music, and Movies'
    },
    {
      id: 6,
      title: 'Toys and Games'
    },
    {
      id: 7,
      title: 'Vehicles'
    }
  ]);

  // const [loading, categories, error] = useApiCall(getCategories);


    return (
        <div className='categories-container'>
          {categories.map((el) => (
              <div className='categories' key={el.id} onClick={() => chooseCategory(el.id)}>
                <span>{el.title}</span>
              </div>
          ))}
        </div>
    );

};

export default Categories;
