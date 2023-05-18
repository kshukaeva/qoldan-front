import React, { useState, useEffect } from 'react';
import {Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import ItemCard from "./components/ItemCard";
import Products from "./components/AllProduct";
import Cart from "./components/Cart";
import Bookmark from './components/Bookmark';
import UserProfile from './components/UserProfile';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import ForgotPassword from "./components/ForgetPassword";
import useApiCall from "./api/useApiCall";
import {getProducts} from "./api/ProductsAPI";
import AboutUs from "./components/AboutUs";
import Uploaimagetest from "./components/Uploaimagetest";
import UserDashboard from './components/user/UserDashboard';
import DonationPage from "./components/donation/DonationPage";
import OrganizationPage from "./components/donation/OrganizationPage";
import EditProduct from "./components/user/EditProduct";
import MyProducts from "./components/user/MyProducts";

function App() {
  const [orders, setOrders] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [items] = useState([
    {
      "id": 1,
      "title": "Women's Sweater",
      "imageUrl": "clothes.jpg",
      "desc": "Stay cozy with this stylish women's sweater. Made from soft and warm material, perfect for the colder months.",
      "category": "clothing",
      "price": "4999"
    },
    {
      "id": 2,
      "title": "Wireless Headphones",
      "imageUrl": "instax.jpg",
      "desc": "Enjoy your music on the go with these high-quality wireless headphones. Connect to any device via Bluetooth.",
      "category": "electronics",
      "price": "8999"
    },
    {
      "id": 3,
      "title": "Garden Gloves",
      "imageUrl": "home.jpg",
      "desc": "Protect your hands while gardening with these durable and comfortable gloves. Available in multiple sizes.",
      "category": "home",
      "price": "1299"
    },
    {
      "id": 4,
      "title": "Yoga Mat",
      "imageUrl": "tennis.jpg",
      "desc": "Get your yoga practice started with this high-quality yoga mat. Made from non-slip material for a safe and comfortable experience.",
      "category": "sport",
      "price": "2999"
    },
    {
      "id": 5,
      "title": "The Great Gatsby Book",
      "imageUrl": "book.jpg",
      "desc": "Experience the classic story of The Great Gatsby by F. Scott Fitzgerald. Perfect for any book lover.",
      "category": "books",
      "price": "999"
    },
    {
      "id": 6,
      "title": "Board Game Set",
      "imageUrl": "toys.jpg",
      "desc": "Enjoy hours of family fun with this board game set. Includes classic games like Monopoly and Scrabble.",
      "category": "games",
      "price": "3999"
    },
    {
      "id": 7,
      "title": "SUV",
      "imageUrl": "bycycle.jpg",
      "desc": "Experience the comfort and luxury of an SUV. Perfect for road trips and family vacations.",
      "category": "vehicles",
      "price": "39999"
    },
    {
      "id": 8,
      "title": "Men's T-Shirt",
      "imageUrl": "clothes.JPG",
      "desc": "Stay stylish with this classic men's t-shirt. Available in multiple colors and sizes.",
      "category": "clothing",
      "price": "1999"
    },
    {
      "id": 9,
      "title": "Smart Watch",
      "imageUrl": "instax.JPG",
      "desc": "Stay connected on the go with this high-tech smart watch. Features include fitness tracking and phone notifications.",
      "category": "electronics",
      "price": "14999"
    },
    {
      "id": 10,
      "title": "Kitchen Knife Set",
      "imageUrl": "home.JPG",
      "desc": "Upgrade your kitchen with this high-quality knife set. Made from durable materials and includes a knife block for storage.",
      "category": "home",
      "price": "7999"
    }
  ]);

  // const [loading, items, error] = useApiCall(getProducts);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  function chooseCategory(categoryId) {
    if (categoryId === null) {
      setCurrentItems(items);
    } else {
      setCurrentItems(items.filter((el) => el.categoryId === categoryId));
    }
  }

  function deleteOrder(id) {
    setOrders(orders.filter(el => el.id !== id));
  }

  function addToOrder(item) {
    let isInArray = false;
    orders.forEach(el => {
      if (el.id === item.id) {
        isInArray = true;
      }
    });
    if (!isInArray) {
      setOrders([...orders, item]);
    }
  }

   function deleteFavourites(id) {
    setFavourites(favourites.filter(el => el.id !== id));
  }

  function addToFavourites(item) {
    let isInArray = false;
    favourites.forEach(el => {
      if (el.id === item.id) {
        isInArray = true;
      }
    });
    if (!isInArray) {
      setFavourites([...favourites, item]);
    }
  }

  return (
    <div>
    <Header/>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home currentItems={items} onAdd={addToOrder} addFavourites={addToFavourites} deleteFavourites={deleteFavourites}/>} />
          <Route path="/all" element={<Products currentItems={currentItems} onAdd={addToOrder} addFavourites={addToFavourites} chooseCategory={chooseCategory} deleteFavourites={deleteFavourites}/>} />
          <Route path="/item/:id" element={<ItemCard items={items} onAdd={addToOrder} addFavourites={addToFavourites} deleteFavourites={deleteFavourites}  />} />
          <Route path="/cart" element={<Cart orders={orders} onDelete={deleteOrder} />} />
          <Route path="/fav" element={<Bookmark favourites={favourites} onAdd={addToOrder} addFavourites={addToFavourites} deleteFavourites={deleteFavourites} />} />
          <Route path="/userprofile" element={<UserProfile/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/test" element={<Uploaimagetest/>}/>
          <Route path="/user-profile" element={<UserDashboard/>}/>
          <Route path="/donation" element={<DonationPage/>} />
          <Route path="/organization/:id" element={<OrganizationPage/>} />
          <Route path="/edit-product" element={<EditProduct/>} />
          <Route path="/my-products" element={<MyProducts/>} />
        </Routes>
      </main>
      <Footer/>
      </div>
  );
}

export default App;
