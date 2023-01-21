import React from 'react';

type ProductCardProps = {
	productID: string,
	name: string;
	image: string;
	price: string;
	onPress: (id: string) => void;
}

const ProductCard = ({ productID, name, image, price, onPress }: ProductCardProps) => {
	return (
		<div className="border shadow-md bg-white rounded-lg shadow-md" onClick={() => onPress(productID)}>
			<img
				className="mx-auto p-2 rounded-t-lg"
				src={image}
				alt="product image"
			/>
			<div className="px-5 pb-5">
				<h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-black">
					{name}
				</h5>

				<div className="flex items-center justify-between">
					<span className="text-s font-bold text-gray-900 dark:text-black">
						{price}
					</span>
				</div>
			</div>
		</div>
	);
};

export { ProductCard };
