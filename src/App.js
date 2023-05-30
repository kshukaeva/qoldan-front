import React, { useState, useEffect } from 'react';
import {Routes, Route } from 'react-router-dom';
import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import Home from "./components/core/Home";
import Login from "./components/auth/Login";
import ItemCard from "./components/products/ItemCard";
import Products from "./components/products/AllProduct";
import Cart from "./components/cart/Cart";
import Bookmark from './components/bookmark/Bookmark';
import Register from './components/auth/Register';
import AddProduct from './components/products/AddProduct';
import ForgotPassword from "./components/auth/ForgetPassword";
import useApiCall from "./api/useApiCall";
import {getProducts} from "./api/ProductsAPI";
import AboutUs from "./components/core/AboutUs";
import Uploaimagetest from "./components/core/Uploaimagetest";
import UserDashboard from './components/user/UserDashboard';
import EditProduct from "./components/products/EditProduct";
import MyProducts from "./components/user/MyProducts";
import AdminDashboard from "./components/admin/AdminDashboard";
import OrganizationDashboard from "./components/donation/dashboard/OrganizationDashboard";
import AnnouncementList from "./components/donation/AnnouncementList";
import AnnouncementDetails from "./components/donation/AnnouncementDetails";
import AddAnnouncement from "./components/donation/AddAnnouncement";
import EditAnnouncement from "./components/donation/EditAnnouncement";

function App() {
  const [orders, setOrders] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [items,setItems] = useState([]);


  // const [loading, items, error] = useApiCall(getProducts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  function chooseCategory(categoryId) {
    if (categoryId === 'all') {
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
          <Route path="/" element={<Home currentItems={items} onAdd={addToOrder} deleteOrder={deleteOrder} addFavourites={addToFavourites} deleteFavourites={deleteFavourites}/>} />
          <Route path="/all" element={<Products currentItems={currentItems} onAdd={addToOrder} deleteOrder={deleteOrder} addFavourites={addToFavourites} chooseCategory={chooseCategory} deleteFavourites={deleteFavourites}/>} />
          <Route path="/item/:id" element={<ItemCard items={items} onAdd={addToOrder} addFavourites={addToFavourites} deleteFavourites={deleteFavourites}  />} />
          <Route path="/cart" element={<Cart orders={orders} onDelete={deleteOrder} />} />
          <Route path="/fav" element={<Bookmark favourites={favourites} onAdd={addToOrder} addFavourites={addToFavourites} deleteFavourites={deleteFavourites} />} />
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/test" element={<Uploaimagetest/>}/>
          <Route path="/user-profile/:userID" element={<UserDashboard />} />
          <Route path="/edit-product" element={<EditProduct/>} />
          <Route path="/my-products" element={<MyProducts/>} />
          <Route path="/forget-password" element={<ForgotPassword/>} />
          <Route path="/admin-profile" element={<AdminDashboard/>}/>
          <Route path="/organization-dashboard/:id" element={<OrganizationDashboard/>} />
          <Route path="/announcements" element={<AnnouncementList/>} />
          <Route path="/announcement/:id" element={<AnnouncementDetails/>} />
          <Route path="/add-announcement" element={<AddAnnouncement/>} />
          <Route path="/edit-announcement/:id" element={<EditAnnouncement/>} />
        </Routes>
      </main>
      <Footer/>
      </div>
  );
}

export default App;
