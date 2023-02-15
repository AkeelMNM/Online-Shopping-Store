import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { Footer, Header } from './components';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import ShoppingCart from './pages/ShoppingCart';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/cart" element={<ShoppingCart />} />
				<Route path="*" element={<Navigate to={'/'} />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
