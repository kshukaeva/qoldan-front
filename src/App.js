import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
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
import AboutUs from "./components/core/AboutUs";
import Uploaimagetest from "./components/core/Uploaimagetest";
import UserDashboard from './components/user/UserDashboard';
import EditProduct from "./components/products/EditProduct";
import MyProducts from "./components/user/MyProducts";
import {deleteFromCart, postAddToCart} from "./api/CartAPI";
import {deleteFromWishlist, postAddToWishlist} from "./api/WishlistAPI";
import OrganizationDashboard from "./components/donation/dashboard/OrganizationDashboard";
import AnnouncementList from "./components/donation/AnnouncementList";
import AnnouncementDetails from "./components/donation/AnnouncementDetails";
import AddAnnouncement from "./components/donation/AddAnnouncement";
import EditAnnouncement from "./components/donation/EditAnnouncement";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
    const [orders, setOrders] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [items] = useState([{
        "id": 1,
        "title": "Women's Sweater",
        "imageUrl": "clothes.jpg",
        "desc": "Stay cozy with this stylish women's sweater. Made from soft and warm material, perfect for the colder months.",
        "category": "clothing",
        "price": "4999"
    }, {
        "id": 2,
        "title": "Wireless Headphones",
        "imageUrl": "instax.jpg",
        "desc": "Enjoy your music on the go with these high-quality wireless headphones. Connect to any device via Bluetooth.",
        "category": "electronics",
        "price": "8999"
    }, {
        "id": 3,
        "title": "Garden Gloves",
        "imageUrl": "home.jpg",
        "desc": "Protect your hands while gardening with these durable and comfortable gloves. Available in multiple sizes.",
        "category": "home",
        "price": "1299"
    }, {
        "id": 4,
        "title": "Yoga Mat",
        "imageUrl": "tennis.jpg",
        "desc": "Get your yoga practice started with this high-quality yoga mat. Made from non-slip material for a safe and comfortable experience.",
        "category": "sport",
        "price": "2999"
    }, {
        "id": 5,
        "title": "The Great Gatsby Book",
        "imageUrl": "book.jpg",
        "desc": "Experience the classic story of The Great Gatsby by F. Scott Fitzgerald. Perfect for any book lover.",
        "category": "books",
        "price": "999"
    }, {
        "id": 6,
        "title": "Board Game Set",
        "imageUrl": "toys.jpg",
        "desc": "Enjoy hours of family fun with this board game set. Includes classic games like Monopoly and Scrabble.",
        "category": "games",
        "price": "3999"
    }, {
        "id": 7,
        "title": "SUV",
        "imageUrl": "bycycle.jpg",
        "desc": "Experience the comfort and luxury of an SUV. Perfect for road trips and family vacations.",
        "category": "vehicles",
        "price": "39999"
    }, {
        "id": 8,
        "title": "Men's T-Shirt",
        "imageUrl": "clothes.JPG",
        "desc": "Stay stylish with this classic men's t-shirt. Available in multiple colors and sizes.",
        "category": "clothing",
        "price": "1999"
    }, {
        "id": 9,
        "title": "Smart Watch",
        "imageUrl": "instax.JPG",
        "desc": "Stay connected on the go with this high-tech smart watch. Features include fitness tracking and phone notifications.",
        "category": "electronics",
        "price": "14999"
    }, {
        "id": 10,
        "title": "Kitchen Knife Set",
        "imageUrl": "home.JPG",
        "desc": "Upgrade your kitchen with this high-quality knife set. Made from durable materials and includes a knife block for storage.",
        "category": "home",
        "price": "7999"
    }]);

    useEffect(() => {
        setCurrentItems(items);
    }, [items]);

    function addToCart(productId, callback, setCallback) {
        postAddToCart(productId)
            .then((response) => {
                if (setCallback) setCallback(!callback);
                // alert(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {

            });
    }

    function removeFromCart(productId, callback, setCallback) {
        deleteFromCart(productId)
            .then((response) => {
                if (setCallback) setCallback(!callback);
                // alert(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {

            });
    }

    function deleteFavourites(productId, callback, setCallback) {
        deleteFromWishlist(productId)
            .then((response) => {
                if (setCallback) setCallback(!callback);
                // alert(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data);
            })
            .finally(() => {

            });
    }

    function addToFavourites(productId, callback, setCallback) {
        postAddToWishlist(productId)
            .then((response) => {
                if (setCallback) setCallback(!callback);
            })
            .catch((error) => {
                alert(error.response.data);
            })
            .finally(() => {

            });
    }

    return (
        <div className="wrapper">
                <Header/>
                <main>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/" element={<Home currentItems={items} onAdd={addToCart} onRemove={removeFromCart}
                                                       addFavourites={addToFavourites} deleteFavourites={deleteFavourites}/>}/>
                        <Route path="/all"
                               element={<Products currentItems={currentItems} onAdd={addToCart} onRemove={removeFromCart}
                                                  addFavourites={addToFavourites} deleteFavourites={deleteFavourites}/>}/>
                        <Route path="/item/:id" element={<ItemCard items={items} onAdd={addToCart} onRemove={removeFromCart}
                                                                   addFavourites={addToFavourites}
                                                                   deleteFavourites={deleteFavourites}
                                                                   addToCart={addToCart} removeFromCart={removeFromCart}/>}/>
                        <Route path="/cart" element={<Cart orders={orders} setOrders={setOrders} onDelete={removeFromCart}/>}/>
                        <Route path="/fav" element={<Bookmark favourites={favourites} setFavourites={setFavourites}
                                                              onAdd={addToCart} onRemove={removeFromCart}
                                                              addFavourites={addToFavourites}
                                                              deleteFavourites={deleteFavourites}/>}/>
                        <Route path="/addproduct" element={<AddProduct/>}/>
                        <Route path="/about-us" element={<AboutUs/>}/>
                        <Route path="/test" element={<Uploaimagetest/>}/>
                        <Route path="/user-profile" element={<UserDashboard/>}/>
                        <Route path="/edit-product/:id" element={<EditProduct/>}/>
                        <Route path="/my-products" element={<MyProducts/>}/>
                        <Route path="/forget-password" element={<ForgotPassword/>}/>
                        <Route path="/admin-profile" element={<AdminDashboard/>}/>
                        <Route path="/organization-dashboard" element={<OrganizationDashboard/>}/>
                        <Route path="/announcements" element={<AnnouncementList/>}/>
                        <Route path="/announcement/:id" element={<AnnouncementDetails/>}/>
                        <Route path="/add-announcement" element={<AddAnnouncement/>}/>
                        <Route path="/edit-announcement/:id" element={<EditAnnouncement/>}/>
                    </Routes>
                </main>
                <Footer/>
        </div>
    );
}

export default App;
