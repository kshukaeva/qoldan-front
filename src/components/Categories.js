import React, { useState } from 'react';

const Categories = ({ chooseCategory }) => {
  const [categories] = useState([
    {
      key: 'all',
      name: 'All'
    },
    {
      key: 'clothing',
      name: 'Clothing and Accessories'
    },
    {
      key: 'electronics',
      name: 'Electronics'
    },
    {
      key: 'home',
      name: 'Home and Garden'
    },
    {
      key: 'sport',
      name: 'Sports and Outdoors'
    },
    {
      key: 'books',
      name: 'Books, Music, and Movies'
    },
    {
      key: 'games',
      name: 'Toys and Games'
    },
    {
      key: 'vehicles',
      name: 'Vehicles'
    }
  ]);

  return (
    <div className='categories'>
      {categories.map((el) => (
        <div key={el.key} onClick={() => chooseCategory(el.key)}>
          {el.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
