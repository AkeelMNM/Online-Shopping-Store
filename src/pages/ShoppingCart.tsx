import React, { useState } from 'react';
import FreeDelivery from '../assets/images/FreeDelivery.png';
import { Input } from '../components';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import * as PaymentService from '../services/PaymentService';
import { CartItem, Invoice } from '../types';

type CartProps = {
	title: string;
	size: string;
	color: string;
	quantity: number;
	price: number;
	image: string;
};

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

const Cart = ({ title, size, color, quantity, price, image }: CartProps) => {
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
		</div>
	);
};

const ShoppingCart = () => {
	const dispatch = useAppDispatch();
	const cart: CartItem[] = useAppSelector(state => state.cart.cart);
	const [formData, setFormData] = useState<Invoice>(INITIAL_STATE);
	const [fromError, setFormError] = useState(ERROR_INITIAL_STATE);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
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

	return (
		<div className={cartStyles.mainContainer}>
			<div className={cartStyles.productContainer}>
				<div className={cartStyles.itemCountContainer}>
					<label className={cartStyles.itemCountText}>
						Item: {cart.length}
					</label>
					<img src={FreeDelivery} className={cartStyles.freeimage} />
				</div>
				{cart &&
					cart.map((item, index) => {
						return (
							<Cart
								key={index}
								color={item.color}
								image={item.image}
								isFreeShipping={item.isFreeShipping}
								quantity={item.quantity}
								size={item.size}
								title={item.title}
								price={item.price}
							/>
						);
					})}
				<div className={cartStyles.itemCountContainer}>
					<label className={cartStyles.itemCountText}>Total</label>
					<label className={cartStyles.itemCountText}>$40</label>
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
		</div>
	);
};

const cartStyles = {
	mainContainer: 'flex p-1',
	productContainer: 'w-1/2 flex-col bg-white px-8 pb-2 ml-1 mb-4 pt-4',
	formContainer:
		'w-1/2 flex-col bg-white px-8 pb-2 ml-1 mb-4 pt-4 shadow-md rounded',
	itemCountContainer:
		'flex flex-row justify-between shadow-md rounded p-2 mb-4',
	itemCountText: 'mt-4 pt-2 font-semibold',
	freeimage: 'w-30 h-20',
	itemContainer: 'grid grid-cols-4 shadow-md rounded p-4 items-center',
	itemDescContainer: 'flex flex-col',
	titleText: 'text-gray-900 text-lg title-font font-medium mb-1',
	itemText: 'justify-self-center',
	itemImage: 'w-20 h-40 justify-self-center',
	billText: 'text-2xl font-bold',
	form: 'mt-4',
	submitButton:
		'text-white bg-[#FF9119] hover:bg-[#FF9119] focus:ring-1 focus:outline-none focus:ring-[#FF9119] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]',
};

export default ShoppingCart;
