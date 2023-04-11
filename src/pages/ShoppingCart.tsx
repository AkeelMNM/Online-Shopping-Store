import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import FreeDelivery from '../assets/images/FreeDelivery.png';
import { CartProductModal, HeaderFooter, Input, Cart } from '../components';
import { fetchUsersCartItems, updateCartPaymentStatus } from '../redux/cart';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import * as PaymentService from '../services/PaymentService';
import { ApiResponse, CartItem, Invoice, User } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_STATE: Invoice = {
	userId: '',
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

const ShoppingCart = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user: User = useAppSelector(state => state.user.user);
	const isUserLoggedIn: boolean = useAppSelector(
		state => state.user.isUserLoggedIn,
	);
	const cart: CartItem[] = useAppSelector(state => {
		return state.cart.cart.filter((item: CartItem) => {
			return !item.isPaymentComplete;
		});
	});
	const [formData, setFormData] = useState<Invoice>(INITIAL_STATE);
	const [fromError, setFormError] = useState(ERROR_INITIAL_STATE);
	const [modalVisibility, setModalVisibility] = useState(false);
	const [productId, setProductId] = useState('');
	const [cartItemId, setCartItemId] = useState('');

	useEffect(() => {
		if (isUserLoggedIn) {
			dispatch(fetchUsersCartItems(_.get(user, '_id', '')));
			setFormData({ ...formData, userId: user._id });
		} else {
			console.log('no user login');
		}
	}, []);

	const calculateTotalCost = (): number => {
		let cost: number = 0;
		cart.map(item => (cost += item.price * item.quantity));
		return cost;
	};

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
			const response: ApiResponse = await PaymentService.makePayment(
				formData,
			);
			if (response.status === 200) {
				const itemIds: (string | undefined)[] = _.map(
					cart,
					item => item._id,
				);
				dispatch(updateCartPaymentStatus(itemIds));
				setFormData(INITIAL_STATE);
				setFormError(ERROR_INITIAL_STATE);
				toast.success('Your order placed successfully!');
			} else {
				toast.warn('Something went wrong. try again!');
			}
		}
	};

	return (
		<HeaderFooter>
			{cart.length <= 0 ? (
				<div className={shoppingCartStyles.container}>
					<div className={shoppingCartStyles.textContainer}>
						<label className={shoppingCartStyles.cartNotItemText}>
							You don't have any items in your cart.
						</label>
					</div>
					{!isUserLoggedIn ? (
						<>
							<label className={shoppingCartStyles.cartLoginText}>
								Have an account? Sign in to see your items.
							</label>
							<div className={shoppingCartStyles.buttonContainer}>
								<button
									className={shoppingCartStyles.signInButton}
									onClick={() => navigate('/login')}>
									Sign In
								</button>
								<button
									className={
										shoppingCartStyles.registerButton
									}
									onClick={() => navigate('/register')}>
									Register
								</button>
							</div>
						</>
					) : (
						<button
							className={shoppingCartStyles.registerButton}
							onClick={() => navigate('/products')}>
							Browse Products
						</button>
					)}
				</div>
			) : (
				<div className={shoppingCartStyles.mainContainer}>
					<div className={shoppingCartStyles.productContainer}>
						<div className={shoppingCartStyles.itemCountContainer}>
							<label className={shoppingCartStyles.itemCountText}>
								Item: {cart.length}
							</label>
							<img
								src={FreeDelivery}
								className={shoppingCartStyles.freeimage}
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
										enableEdit={true}
									/>
								);
							})}
						<div className={shoppingCartStyles.itemCountContainer}>
							<label className={shoppingCartStyles.itemCountText}>
								Total
							</label>
							<label
								className={
									shoppingCartStyles.itemCountText
								}>{`$${calculateTotalCost()}`}</label>
						</div>
					</div>
					<div className={shoppingCartStyles.formContainer}>
						<label className={shoppingCartStyles.billText}>
							Billing Information
						</label>
						<form className={shoppingCartStyles.form}>
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
								className={shoppingCartStyles.submitButton}
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
			)}
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
				theme="dark"
			/>
		</HeaderFooter>
	);
};

const shoppingCartStyles = {
	mainContainer: 'flex flex-wrap h-full g-6',
	productContainer: 'xl:ml-0 xl:w-1/2 lg:w-1/2 md:w-8/12 md:mb-0 p-2',
	formContainer:
		'w-full xl:ml-0 xl:w-1/2 lg:w-1/2 md:w-8/12 md:mb-0 p-2 xl:mb-[2.6rem]',
	itemCountContainer:
		'flex flex-row justify-between shadow-md rounded p-2 mb-4',
	itemCountText: 'mt-4 pt-2 font-semibold',
	freeimage: 'w-30 h-20',
	billText: 'text-2xl font-bold',
	form: 'mt-4',
	submitButton:
		'text-white bg-blue-600 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-600 font-medium rounded-sm text-sm w-full px-5 mb-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600',
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
