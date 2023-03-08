import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import ShoppingCart from './pages/ShoppingCart';
import UpdateUserProfile from './pages/UpdateUserProfile';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/products" element={<Products />} />
				<Route path="/cart" element={<ShoppingCart />} />
				<Route path="/updateProfile" element={<UpdateUserProfile />} />
				<Route path="*" element={<Navigate to={'/'} />} />
			</Routes>
		</Router>
	);
};

export default App;
