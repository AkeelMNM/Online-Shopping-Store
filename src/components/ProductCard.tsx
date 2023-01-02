import React from 'react';

interface ProductCardProps {
	name: string;
	image: string;
	price: number;
	onPress: () => void;
}

const ProductCard = (props: ProductCardProps) => {
	return (
		<div className="border shadow-md bg-white rounded-lg shadow-md">
			<img
				className="mx-auto p-2 rounded-t-lg"
				src={props.image}
				alt="product image"
			/>
			<div className="px-5 pb-5">
				<h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-black">
					{props.name}
				</h5>

				<div className="flex items-center justify-between">
					<span className="text-s font-bold text-gray-900 dark:text-black">
						${props.price}
					</span>
				</div>
			</div>
		</div>
	);
};

export { ProductCard };
