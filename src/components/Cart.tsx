import React = require('react');

type CartProps = {
	title: string;
	size: string;
	color: string;
	quantity: number;
	price: number;
	image: string;
	onPressEdit: () => void;
	enableEdit: boolean;
};

const Cart = ({
	title,
	size,
	color,
	quantity,
	price,
	image,
	onPressEdit,
	enableEdit = true,
}: CartProps) => {
	return (
		<div
			className={`${cartStyles.itemContainer} ${
				enableEdit ? 'grid-cols-6' : 'grid-cols-5'
			}`}>
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
			{enableEdit ? (
				<button className={cartStyles.editButton} onClick={onPressEdit}>
					Edit
				</button>
			) : (
				<></>
			)}
		</div>
	);
};

const cartStyles = {
	itemContainer: 'grid shadow-md rounded p-4 items-center',
	itemDescContainer: 'flex flex-col pl-4 col-span-2',
	titleText: 'text-gray-900 w-full text-lg title-font font-medium mb-1',
	itemText: 'justify-self-center',
	itemImage: 'w-28 h-40 justify-self-center',
	editButton:
		'inline-block px-4 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out',
};

export { Cart };
