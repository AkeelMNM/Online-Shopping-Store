import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCart from '../assets/images/ShoppingCart.png';

const Header = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-row">
			<label className="pt-2 px-5 font-serif text-4xl font-semibold">
				Fashion Studio
			</label>
			<div className="pt-3.5 justify-center flex-1">
				<button
					className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
					onClick={() => {
						navigate('/products');
					}}>
					All Products
				</button>
			</div>
			<img
				className="w-8 h-8 m-4"
				src={ShoppingCart}
				alt="ShoppingCart"
				onClick={() => {
					navigate('/');
				}}
			/>
		</div>
	);
};

export { Header };
