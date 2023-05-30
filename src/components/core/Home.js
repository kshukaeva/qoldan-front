import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../products/Items';
import {TbArrowNarrowRight} from 'react-icons/tb';
import useApiCall from "../../api/useApiCall";
import {getProducts} from "../../api/ProductsAPI";
import img from "../../img/img.png"

function Home(props) {
  const navigate = useNavigate();
  const [numItemsToShow] = useState(9);
  const [callback, setCallback] = useState(false);

  const handleSeeAllClick = () => {
    navigate('/all');
  };

  const handleItemCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  // const itemsToShow = props.currentItems.slice(0, numItemsToShow);
    const [itemsToShow, setItemsToShow] = useState([]);

    useEffect(() => {
        getProducts(numItemsToShow)
            .then((response) => {
                setItemsToShow(response.data);
            })
            .catch((error) => {
                alert(error.getMessage);
            })
            .finally(() => {
                console.log(itemsToShow);
            })
    }, [callback]);

    console.log(itemsToShow);
  return (
    <div className='home'>
      <div className='presentation'></div>

        <Items items={itemsToShow}
               onAdd={props.onAdd}
               onRemove={props.onRemove}
               addFavourites={props.addFavourites}
               deleteFavourites={props.deleteFavourites}
               onItemClick={handleItemCardClick}
               callback={callback}
               setCallback={setCallback}/>
        <button onClick={handleSeeAllClick}>
            <span>ALL PRODUCTS</span>
            <TbArrowNarrowRight className='tbnarrow'/>
        </button>

        <div className='team'>
            <div className='team-image'>
                <img src={img} alt="img-team"/>
            </div>
            <div className='team-text'>
                We are a team of students who strive to create useful and necessary
                applications and websites for people. Our goal is to make a more
                convenient and accessible marketplace for vintage and supported
                products, where users can make purchases without any difficulties.
            </div>
        </div>
    </div>
  );
}

export default Home;
