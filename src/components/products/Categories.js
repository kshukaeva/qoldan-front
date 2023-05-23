import React, { useState, useEffect } from 'react';
import {getCategories} from '../../api/CategoryAPI'
import useApiCall from "../../api/useApiCall";

const Categories = ({ chooseCategory }) => {
  // const [categories] = useState([
  //   {
  //     key: 'all',
  //     name: 'All'
  //   },
  //   {
  //     key: 'clothing',
  //     name: 'Clothing and Accessories'
  //   },
  //   {
  //     key: 'electronics',
  //     name: 'Electronics'
  //   },
  //   {
  //     key: 'home',
  //     name: 'Home and Garden'
  //   },
  //   {
  //     key: 'sport',
  //     name: 'Sports and Outdoors'
  //   },
  //   {
  //     key: 'books',
  //     name: 'Books, Music, and Movies'
  //   },
  //   {
  //     key: 'games',
  //     name: 'Toys and Games'
  //   },
  //   {
  //     key: 'vehicles',
  //     name: 'Vehicles'
  //   }
  // ]);

  const [loading, categories, error] = useApiCall(getCategories);

  if (categories) {
    return (
        <div className='categories-container'>
          {categories.map((el) => (
              <div className='categories' key={el.id} onClick={() => chooseCategory(el.id)}>
                <span>{el.title}</span>
              </div>
          ))}
        </div>
    );
  }
};

export default Categories;
