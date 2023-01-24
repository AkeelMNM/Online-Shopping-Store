import React, { useState } from 'react';
import FreeDelivery from '../assets/images/FreeDelivery.png';
import { Input } from '../components';

type CartItemProps = {
	isFreeShipping: boolean;
	title: string;
	size: string;
	color: string;
	quantity: number;
	subTotal: number;
	image: string;
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

const ShoppingCart = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		address: '',
		city: '',
		province: '',
		mobileNo: '',
	});

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmitBill = (): void => {};

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
						name="fullName"
						type="text"
						value={formData.fullName}
						onChangeInput={onChangeInput}
						label="Complete Name (FirstName, LastName)"
						required={true}
					/>
					<Input
						name="address"
						type="text"
						value={formData.address}
						onChangeInput={onChangeInput}
						label="Full Address"
						required={true}
					/>
					<Input
						name="city"
						type="text"
						value={formData.city}
						onChangeInput={onChangeInput}
						label="City"
						required={true}
					/>
					<Input
						name="province"
						type="text"
						value={formData.province}
						onChangeInput={onChangeInput}
						label="State/Province"
						required={true}
					/>
					<Input
						name="mobileNo"
						type="text"
						value={formData.mobileNo}
						onChangeInput={onChangeInput}
						label="Mobile #"
						required={true}
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
	billText: 'text-2xl font-bold',
	form: 'mt-4',
	submitButton:
		'text-white bg-[#FF9119] hover:bg-[#FF9119] focus:ring-1 focus:outline-none focus:ring-[#FF9119] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-[#FF9119] dark:hover:bg-[#FF9119] dark:focus:ring-[#FF9119]',
};

export default ShoppingCart;
