import React, { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import ShoppingCart from '../assets/images/ShoppingCart.png';
import { clearCartItems } from '../redux/cart';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import { logoutUser } from '../redux/user';
import { logOut } from '../services/UserService';
import { User } from '../types';
import { UserSettingsDropMenu } from './UserSettingsDropMenu';

type HeaderProps = {
	navigate: NavigateFunction;
};

type FooterProps = {
	navigate: NavigateFunction;
};

type HeaderFooterProps = {
	children: React.ReactNode;
};

const Header = ({ navigate }: HeaderProps) => {
	const dispatch = useAppDispatch();
	const isUserLoggedIn: boolean = useAppSelector(
		state => state.user.isUserLoggedIn,
	);
	const user: User = useAppSelector(state => state.user.user);
	const [isOpen, setOpen] = useState(false);

	const onPressHandleDropDown = (): void => {
		setOpen(!isOpen);
	};

	const onPressOpenSettings = (): void => {};

	const onPressOpenProfile = (): void => {
		navigate('/updateProfile');
		onPressHandleDropDown();
	};

	const onPressLogOutUser = async (): Promise<void> => {
		await logOut();
		dispatch(clearCartItems());
		dispatch(logoutUser());
		onPressHandleDropDown();
		navigate('/');
	};

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
					Browse Products
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
			{isUserLoggedIn ? (
				<div className={headerStyles.menuContainer}>
					<UserSettingsDropMenu
						onPressHandleDropDown={onPressHandleDropDown}
						isOpen={isOpen}
						onPressLogOut={onPressLogOutUser}
						userData={user}
						onPressProfile={onPressOpenProfile}
						onPressSettings={onPressOpenSettings}
					/>
				</div>
			) : (
				<label
					onClick={() => navigate('/login')}
					className={headerStyles.login}>
					Sign In
				</label>
			)}
		</header>
	);
};

const Footer = ({ navigate }: FooterProps) => {
	return (
		<footer className={footerStyles.mainContainer}>
			<span className={footerStyles.rightsText}>
				© 2022 <a className={footerStyles.hoverText}>FashionStudio™</a>.
				All Rights Reserved.
			</span>
			<ul className={footerStyles.linkContainer}>
				<li>
					<a
						onClick={() => navigate('#')}
						className={footerStyles.link}>
						About
					</a>
				</li>
				<li>
					<a href="#" className={footerStyles.link}>
						Privacy Policy
					</a>
				</li>
				<li>
					<a href="#" className={footerStyles.link}>
						Licensing
					</a>
				</li>
				<li>
					<a href="#" className={footerStyles.hoverText}>
						Contact
					</a>
				</li>
			</ul>
		</footer>
	);
};

const HeaderFooter = ({ children }: HeaderFooterProps) => {
	const navigate = useNavigate();

	return (
		<div>
			<Header navigate={navigate} />
			<div>{children}</div>
			<Footer navigate={navigate} />
		</div>
	);
};

const headerStyles = {
	mainContainer: 'flex flex-row',
	headText: 'pt-2 mt-1 px-5 font-sans text-4xl font-semibold cursor-pointer',
	btnContainer: 'pt-3.5 justify-center flex-1',
	productBtn:
		'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br dark:focus:ring-green-800 font-medium rounded-sm text-sm px-4 py-2.5 text-center',
	image: 'w-8 h-8 my-4 cursor-pointer',
	login: 'mt-4 mr-4 ml-2 font-medium text-blue-600 hover:underline cursor-pointer',
	menuContainer: 'pt-3.5 mr-4',
};

const footerStyles = {
	mainContainer:
		'p-5 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800',
	rightsText: 'text-sm text-gray-500 sm:text-center dark:text-gray-400',
	linkContainer:
		'flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0',
	link: 'mr-4 hover:underline md:mr-6',
	hoverText: 'hover:underline',
};

export { HeaderFooter };
