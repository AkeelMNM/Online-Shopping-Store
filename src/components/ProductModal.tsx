import React from 'react';
import { Product } from '../types';
import { QuantityPicker } from 'react-qty-picker';
import Shirt from '../assets/images/Shirt.png';

type ProductModalProps = {
	visible: Boolean;
	productId: string;
};

const ProductModal = ({ visible, productId }: ProductModalProps) => {
	if (visible) {
		return (
			<div className={productModalStyles.mainContainer}>
				<div className={productModalStyles.container}>
					<div className={productModalStyles.imageContainer}>
						<img
							alt="product-image"
							className={productModalStyles.image}
							src={Shirt}
						/>
					</div>
					<div className={productModalStyles.optionContainer}>
						<h1 className={productModalStyles.name}>
							Blue Dress v2
						</h1>
						<div className={productModalStyles.colorContainer}>
							<span className={productModalStyles.labelText}>
								Color
							</span>
							<button
								className={
									productModalStyles.productColor
								}></button>
							<button
								className={`${productModalStyles.productColor} ml-1 bg-gray-700`}></button>
							<button
								className={`${productModalStyles.productColor} ml-1 bg-indigo-500`}></button>
						</div>
						<div className={productModalStyles.sizeContainer}>
							<span className={productModalStyles.labelText}>
								Size
							</span>
							<div className={productModalStyles.selectDiv}>
								<select
									className={
										productModalStyles.selectContainer
									}>
									<option>SM</option>
									<option>M</option>
									<option>L</option>
									<option>XL</option>
								</select>
								<span className={productModalStyles.arrowSvg}>
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										className={productModalStyles.svg}
										viewBox="0 0 24 24">
										<path d="M6 9l6 6 6-6"></path>
									</svg>
								</span>
							</div>
						</div>
						<div className={productModalStyles.pickerContainer}>
							<span className={productModalStyles.labelText}>
								Quantity
							</span>
							<QuantityPicker smooth max={5} value={1} />
						</div>
						<span className={productModalStyles.priceText}>
							$45.99
						</span>
						<div className={productModalStyles.buttonContainer}>
							<button className={productModalStyles.button}>
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

const productModalStyles = {
	mainContainer:
		'fixed insert-0 right-0 left-0 top-0 bottom-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center',
	container: 'flex flex-rows p-5 bg-white rounded',
	imageContainer: 'p-2 pr-5 w-full',
	image: 'w-full lg:h-auto h-64 object-cover object-center rounded',
	optionContainer: 'w-full',
	name: 'text-gray-900 text-3xl title-font font-medium mb-1',
	colorContainer: 'flex pt-5',
	labelText: 'mr-3',
	productColor:
		'border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none',
	sizeContainer: 'flex items-center pt-5',
	selectContainer:
		'rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10',
	arrowSvg:
		'absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center',
	pickerContainer: 'flex flex items-center pt-5 pb-5',
	priceText: 'title-font font-medium text-2xl text-gray-900',
	buttonContainer: 'w-full p-3',
	button: 'w-full ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded',
	svg: 'w-4 h-4',
	selectDiv: 'relative',
};

export { ProductModal };
