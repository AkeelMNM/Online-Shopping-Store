import React, { useState } from 'react';
import FreeDelivery from '../assets/images/FreeDelivery.png';

type CartItemProps = {
	isFreeShipping: boolean;
	title: string;
	size: string;
	color: string;
	quantity: number;
	subTotal: number;
	image: string;
};

type InputProps = {
	label: string;
	value: string;
	type: string;
	onChange: (value: string) => void;
};

const CartItem = ({
	title,
	size,
	color,
	quantity,
	subTotal,
	isFreeShipping,
	image,
}: CartItemProps) => {
	return (
		<div className={cartStyles.itemContainer}>
			{isFreeShipping && (
				<img
					src={image}
					crossOrigin="anonymous"
					className={cartStyles.freeimage}
				/>
			)}
			<div className={cartStyles.itemDescContainer}>
				<label className={cartStyles.titleText}>{title}</label>
				<label className={cartStyles.itemText}>{size}</label>
				<label className={cartStyles.itemText}>{color}</label>
			</div>
			<label className={cartStyles.itemText}>Qty: {quantity}</label>
			<label className={cartStyles.itemText}>SubTotal: {subTotal}</label>
		</div>
	);
};

const Input = ({ label, onChange, value, type }: InputProps) => {
	return (
		<div className={cartStyles.inputContainer}>
			<label className={cartStyles.inputLabel}>{label}</label>
			<input
				type={type}
				value={value}
				onChange={e => onChange(e.target.value)}
				className={cartStyles.input}></input>
		</div>
	);
};

const ShoppingCart = () => {
	const [fullName, setFullName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [mobileNo, setMobileNo] = useState('');

	const onSubmitBill = () => {};

	return (
		<div className={cartStyles.mainContainer}>
			<div className={cartStyles.productContainer}>
				<div className={cartStyles.itemCountContainer}>
					<label className={cartStyles.itemCountText}>Item: 1</label>
					<img src={FreeDelivery} className={cartStyles.freeimage} />
				</div>
				<div className={cartStyles.itemContainer}>
					<img src={FreeDelivery} className={cartStyles.freeimage} />
					<div className={cartStyles.itemDescContainer}>
						<label className={cartStyles.titleText}>title</label>
						<label className={cartStyles.itemText}>size</label>
						<label className={cartStyles.itemText}>color</label>
					</div>
					<label className={cartStyles.itemText}>Qty: 1</label>
					<label className={cartStyles.itemText}>SubTotal: 1</label>
				</div>
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
						type="text"
						value={fullName}
						onChange={setFullName}
						label="Complete Name (FirstName, LastName)"
					/>
					<Input
						type="text"
						value={address}
						onChange={setAddress}
						label="Full Address"
					/>
					<Input
						type="text"
						value={city}
						onChange={setCity}
						label="City"
					/>
					<Input
						type="text"
						value={province}
						onChange={setProvince}
						label="State/Province"
					/>
					<Input
						type="text"
						value={mobileNo}
						onChange={setMobileNo}
						label="Mobile #"
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
	freeimage: 'w-48 h-20',
	itemContainer: 'flex flex-row justify-between shadow-md rounded p-2',
	itemDescContainer: 'flex flex-col',
	titleText: 'text-gray-900 text-2xl title-font font-medium mb-1',
	itemText: '',
	inputContainer: 'mb-4',
	billText: 'text-2xl font-bold',
	form: 'mt-4',
	inputLabel: 'block mb-2 text-sm font-medium text-gray-900 ',
	input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
	submitButton:
		'text-white bg-[#FF9119] hover:bg-[#FF9119] focus:ring-1 focus:outline-none focus:ring-[#FF9119] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]',
};

export default ShoppingCart;
