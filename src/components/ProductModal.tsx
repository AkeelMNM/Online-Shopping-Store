import React from 'react';
import { Product } from '../interfaces';
import { QuantityPicker } from 'react-qty-picker';
import Shirt from '../assets/images/Shirt.png';

interface ProductModalProps {
	visible: Boolean;
	productId: string;
}

const ProductModal = (props: ProductModalProps) => {
	if (props.visible) {
		return (
			<div className="fixed insert-0 right-0 left-0 top-0 bottom-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
				<div className="flex flex-rows p-5 bg-white rounded">
					<div className="p-2 pr-5 w-full">
						<img
							alt="product-image"
							className="w-full lg:h-auto h-64 object-cover object-center rounded"
							src={Shirt}
						/>
					</div>
					<div className="w-full">
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
							Blue Dress v2
						</h1>
						<div className="flex pt-5">
							<span className="mr-3">Color</span>
							<button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
							<button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
							<button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
						</div>
						<div className="flex items-center pt-5">
							<span className="mr-3">Size</span>
							<div className="relative">
								<select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
									<option>SM</option>
									<option>M</option>
									<option>L</option>
									<option>XL</option>
								</select>
								<span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										className="w-4 h-4"
										viewBox="0 0 24 24">
										<path d="M6 9l6 6 6-6"></path>
									</svg>
								</span>
							</div>
						</div>
						<div className="flex flex items-center pt-5 pb-5">
							<span className="mr-3">Quantity</span>
							<QuantityPicker smooth max={5} value={1} />
						</div>
						<span className="title-font font-medium text-2xl text-gray-900">
							$45.99
						</span>
						<div className="w-full p-3">
							<button className="w-full ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

export { ProductModal };
