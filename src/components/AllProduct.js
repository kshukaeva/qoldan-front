import React, {useState, useEffect} from 'react';
import Categories from './Categories';
import Items from './Items';
import { useNavigate } from 'react-router-dom';
import {getProducts} from "../api/ProductsAPI";



function AllProduct(props) {
  const navigate = useNavigate();
  const [ products, setProducts ] = useState([]);
  const [ callback, setCallback ] = useState(false);

    useEffect(() => {
        getProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                alert(error.getMessage);
            })
            .finally(() => {
                console.log("get products: finish!");
                console.log(products);
            })
    }, [callback]);

  const handleItemCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div className='all'>
      <input type="text" placeholder="What are you looking for?" className="search-bar" /> 
      <Categories chooseCategory={props.chooseCategory} />
      <Items items={products} onAdd={props.onAdd} onRemove={props.onRemove} addFavourites={props.addFavourites}
             deleteFavourites={props.deleteFavourites} onItemClick={handleItemCardClick}
             callback={callback} setCallback={setCallback}/>
    </div>
  );
}

export default AllProduct;
