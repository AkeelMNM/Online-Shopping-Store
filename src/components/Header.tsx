import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCart from '../assets/images/ShoppingCart.png';

const Header = () => {
	const navigate = useNavigate();
	const path = window.location.pathname;

	if (path === '/' || path === '/register') {
		return <></>;
	} else {
		return (
			<header className={headerStyles.mainContainer}>
				<label
					onClick={() => navigate('/')}
					className={headerStyles.headText}>
					Fashion Studio
				</label>
				<div className={headerStyles.btnContainer}>
					<button
						className={headerStyles.productBtn}
						onClick={() => {
							navigate('/products');
						}}>
						All Products
					</button>
				</div>
				<img
					className={headerStyles.image}
					src={ShoppingCart}
					alt="ShoppingCart"
					onClick={() => {
						navigate('/cart');
					}}
				/>
			</header>
		);
	}
};

const headerStyles = {
	mainContainer: 'flex flex-row',
	headText: 'pt-2 px-5 font-sans text-4xl font-semibold cursor-pointer',
	btnContainer: 'pt-3.5 justify-center flex-1',
	productBtn:
		'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center',
	image: 'w-8 h-8 m-4 cursor-pointer',
};

export { Header };
