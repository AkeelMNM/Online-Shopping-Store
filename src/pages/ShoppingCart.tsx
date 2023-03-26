import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import FreeDelivery from '../assets/images/FreeDelivery.png';
import { CartProductModal, HeaderFooter, Input } from '../components';
import { fetchUsersCartItems } from '../redux/cart';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import * as PaymentService from '../services/PaymentService';
import { CartItem, Invoice, User } from '../types';

const INITIAL_STATE: Invoice = {
	fullName: '',
	address: '',
	city: '',
	province: '',
	mobileNo: '',
};

const ERROR_INITIAL_STATE = {
	fullNameErr: '',
	addressErr: '',
	cityErr: '',
	provinceErr: '',
	mobileNoErr: '',
};

type CartProps = {
	title: string;
	size: string;
	color: string;
	quantity: number;
	price: number;
	image: string;
	onPressEdit: () => void;
};

const Cart = ({
	title,
	size,
	color,
	quantity,
	price,
	image,
	onPressEdit,
}: CartProps) => {
	return (
		<div className={cartStyles.itemContainer}>
			<img
				src={image}
				crossOrigin="anonymous"
				className={cartStyles.itemImage}
			/>
			<div className={cartStyles.itemDescContainer}>
				<label className={cartStyles.titleText}>{title}</label>
				<label>{size}</label>
				<label>{color}</label>
			</div>
			<label className={cartStyles.itemText}>Qty: {quantity}</label>
			<label className={cartStyles.itemText}>
				SubTotal: {price * quantity}
			</label>
			<button className={cartStyles.editButton} onClick={onPressEdit}>
				Edit
			</button>
		</div>
	);
};

const ShoppingCart = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user: User = useAppSelector(state => state.user.user);
	const isUserLoggedIn: boolean = useAppSelector(
		state => state.user.isUserLoggedIn,
	);
	const cart: CartItem[] = useAppSelector(state => state.cart.cart);
	const [formData, setFormData] = useState<Invoice>(INITIAL_STATE);
	const [fromError, setFormError] = useState(ERROR_INITIAL_STATE);
	const [modalVisibility, setModalVisibility] = useState(false);
	const [productId, setProductId] = useState('');
	const [cartItemId, setCartItemId] = useState('');
	const [totalCost, setTotalCost] = useState(0);

	useEffect(() => {
		if (isUserLoggedIn) {
			dispatch(fetchUsersCartItems(_.get(user, '_id', '')));
		} else {
			console.log('no user login');
		}
	}, []);

	useEffect(() => {
		let cost: number = 0;
		cart.map(item => (cost = +item.price * item.quantity));
		setTotalCost(cost);
	}, [cart]);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onPressUpdateCart = (productId: string, cartItemId: string): void => {
		setProductId(productId);
		setCartItemId(cartItemId);
		setModalVisibility(true);
	};

	const validateInputFields = (): boolean => {
		let isFormValid: boolean = true;

		if (!formData.fullName && formData.fullName === '') {
			isFormValid = false;
			setFormError(prevState => {
				return {
					...prevState,
					fullNameErr: 'Please Enter Your Full Name',
				};
			});
		}

		if (!formData.address && formData.address === '') {
			isFormValid = false;
			setFormError(prevState => {
				return {
					...prevState,
					addressErr: 'Please Enter Your Address',
				};
			});
		}

		if (!formData.city && formData.city === '') {
			isFormValid = false;
			setFormError(prevState => {
				return {
					...prevState,
					cityErr: 'Please Enter Your City',
				};
			});
		}

		if (!formData.province && formData.province === '') {
			isFormValid = false;
			setFormError(prevState => {
				return {
					...prevState,
					provinceErr: 'Please Enter Your Province',
				};
			});
		}

		if (!formData.mobileNo && formData.mobileNo === '') {
			isFormValid = false;
			setFormError(prevState => {
				return {
					...prevState,
					mobileNoErr: 'Please Enter Your Mobile Number',
				};
			});
		}
		return isFormValid;
	};

	const onSubmitBill = async (
		e: React.MouseEvent<HTMLInputElement>,
	): Promise<void> => {
		e.preventDefault();
		if (validateInputFields()) {
			const response = await PaymentService.makePayment(formData);
			setFormData(INITIAL_STATE);
			setFormError(ERROR_INITIAL_STATE);
		}
	};

	if (cart.length <= 0) {
		return (
			<HeaderFooter>
				<div className={cartStyles.container}>
					<div className={cartStyles.textContainer}>
						<label className={cartStyles.cartNotItemText}>
							You don't have any items in your cart.
						</label>
					</div>
					{!isUserLoggedIn ? (
						<>
							<label className={cartStyles.cartLoginText}>
								Have an account? Sign in to see your items.
							</label>
							<div className={cartStyles.buttonContainer}>
								<button
									className={cartStyles.signInButton}
									onClick={() => navigate('/login')}>
									Sign In
								</button>
								<button
									className={cartStyles.registerButton}
									onClick={() => navigate('/register')}>
									Register
								</button>
							</div>
						</>
					) : (
						<button
							className={cartStyles.registerButton}
							onClick={() => navigate('/products')}>
							Browse Products
						</button>
					)}
				</div>
			</HeaderFooter>
		);
	} else {
		return (
			<HeaderFooter>
				<div className={cartStyles.mainContainer}>
					<div className={cartStyles.productContainer}>
						<div className={cartStyles.itemCountContainer}>
							<label className={cartStyles.itemCountText}>
								Item: {cart.length}
							</label>
							<img
								src={FreeDelivery}
								className={cartStyles.freeimage}
							/>
						</div>
						{cart &&
							cart.map((item, index) => {
								return (
									<Cart
										key={index}
										color={_.get(item, 'color', '')}
										image={_.get(item, 'image', '')}
										//isFreeShipping={item.isFreeShipping}
										quantity={_.get(item, 'quantity', 0)}
										size={_.get(item, 'size', '')}
										title={_.get(item, 'title', '')}
										price={_.get(item, 'price', 0)}
										onPressEdit={() =>
											onPressUpdateCart(
												item.productId,
												_.get(item, '_id', ''),
											)
										}
									/>
								);
							})}
						<div className={cartStyles.itemCountContainer}>
							<label className={cartStyles.itemCountText}>
								Total
							</label>
							<label
								className={
									cartStyles.itemCountText
								}>{`$${totalCost}`}</label>
						</div>
					</div>
					<div className={cartStyles.formContainer}>
						<label className={cartStyles.billText}>
							Billing Information
						</label>
						<form className={cartStyles.form}>
							<Input
								name="fullName"
								type="text"
								value={formData.fullName}
								onChangeInput={onChangeInput}
								label="Complete Name (FirstName, LastName)"
								error={fromError.fullNameErr}
							/>
							<Input
								name="address"
								type="text"
								value={formData.address}
								onChangeInput={onChangeInput}
								label="Full Address"
								error={fromError.addressErr}
							/>
							<Input
								name="city"
								type="text"
								value={formData.city}
								onChangeInput={onChangeInput}
								label="City"
								error={fromError.cityErr}
							/>
							<Input
								name="province"
								type="text"
								value={formData.province}
								onChangeInput={onChangeInput}
								label="State/Province"
								error={fromError.provinceErr}
							/>
							<Input
								name="mobileNo"
								type="text"
								value={formData.mobileNo}
								onChangeInput={onChangeInput}
								label="Mobile #"
								error={fromError.mobileNoErr}
							/>
							<input
								type="submit"
								onClick={onSubmitBill}
								className={cartStyles.submitButton}
								value="Complete Purchase"
							/>
						</form>
					</div>
					<CartProductModal
						visible={modalVisibility}
						productId={productId}
						cartItemId={cartItemId}
						onPressClose={() => setModalVisibility(false)}
					/>
				</div>
			</HeaderFooter>
		);
	}
};

const cartStyles = {
	mainContainer: 'flex flex-wrap h-full g-6',
	productContainer: 'xl:ml-0 xl:w-1/2 lg:w-1/2 md:w-8/12 md:mb-0 p-2',
	formContainer:
		'w-full xl:ml-0 xl:w-1/2 lg:w-1/2 md:w-8/12 md:mb-0 p-2 xl:mb-[2.6rem]',
	itemCountContainer:
		'flex flex-row justify-between shadow-md rounded p-2 mb-4',
	itemCountText: 'mt-4 pt-2 font-semibold',
	freeimage: 'w-30 h-20',
	itemContainer: 'grid grid-cols-6 shadow-md rounded p-4 items-center',
	itemDescContainer: 'flex flex-col pl-4 col-span-2',
	titleText: 'text-gray-900 w-full text-lg title-font font-medium mb-1',
	itemText: 'justify-self-center',
	itemImage: 'w-28 h-40 justify-self-center',
	billText: 'text-2xl font-bold',
	form: 'mt-4',
	submitButton:
		'text-white bg-blue-600 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-600 font-medium rounded-sm text-sm w-full px-5 mb-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600',
	editButton:
		'inline-block px-4 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out',
	container:
		'container max-w-lg mx-auto flex flex-col h-screen items-center justify-center px-2',
	textContainer: 'text-center mt-4 mb-2',
	signInButton:
		'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
	registerButton:
		'bg-transparent hover:bg-blue-100 hover:text-blue-700 hover:border-blue-500 text-blue-700 font-semibold hover:text-blue-700 py-2.5 ml-2 px-10 border border-blue-500 rounded-lg hover:border-blue-500',
	cartNotItemText: 'text-2xl dark:black',
	cartLoginText: 'text-lg dark:black',
	buttonContainer: 'flex flex-row mt-4 mb-4',
};

export default ShoppingCart;
