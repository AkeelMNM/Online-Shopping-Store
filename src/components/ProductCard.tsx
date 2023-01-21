import React from 'react';

type ProductCardProps = {
	productID: string;
	name: string;
	image: string;
	price: string;
	onPress: (id: string) => void;
};

const ProductCard = ({
	productID,
	name,
	image,
	price,
	onPress,
}: ProductCardProps) => {
	return (
		<div
			className={productCardStyles.mainContainer}
			onClick={() => onPress(productID)}>
			<img
				className={productCardStyles.image}
				src={image}
				alt="product image"
			/>
			<div className={productCardStyles.container}>
				<h5 className={productCardStyles.title}>{name}</h5>
				<div className={productCardStyles.priceContainer}>
					<span className={productCardStyles.price}>{price}</span>
				</div>
			</div>
		</div>
	);
};

const productCardStyles = {
	mainContainer:
		'border shadow-md bg-white rounded-lg shadow-md cursor-pointer',
	image: 'mx-auto p-2 rounded-t-lg',
	container: 'px-5 pb-5',
	title: 'text-l font-semibold tracking-tight text-gray-900 dark:text-black',
	priceContainer: 'flex items-center justify-between',
	price: 'text-s font-bold text-gray-900 dark:text-black',
};

export { ProductCard };
