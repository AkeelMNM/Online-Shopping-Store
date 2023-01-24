import React, { useEffect, useState } from 'react';
import { CartItem, Product, Variant } from '../types';
import { QuantityPicker } from 'react-qty-picker';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import _ from 'lodash';
import { AddItemToCart } from '../redux/cart';

type ProductModalProps = {
	visible: Boolean;
	productId: string;
	onPressClose: () => void;
};

const ProductModal = ({
	visible,
	productId,
	onPressClose,
}: ProductModalProps) => {
	const product: Product = useAppSelector(state => {
		return state.product.products.find((item: Product) => {
			return item.id === productId;
		});
	});
	const dispatch = useAppDispatch();
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedCount, setSelectedCount] = useState(0);

	const productColors = _.uniqBy(product && product.variants, 'color');
	const productSizes = _.uniqBy(product && product.variants, 'size');

	const onPressAddToCart = () => {
		const variant = _.find(product.variants, {
			color: selectedColor,
			size: selectedSize,
		});

		if (variant) {
			const cartItem: CartItem = {
				id: product.id,
				variantId: variant.id,
				quantity: selectedCount,
				title: product.title,
				size: variant.size,
				color: variant.color,
				price: parseInt(variant.price.replace(/\D/g, "")),
				isFreeShipping: false,
				image: variant.image,
			};

			dispatch(AddItemToCart(cartItem));
			onPressClose();
		} else {
			alert('Sorry this product not available');
		}
	};

	if (visible) {
		return (
			<div className={productModalStyles.mainContainer}>
				<div
					className={productModalStyles.closeContainer}
					onClick={onPressClose}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="48"
						width="48">
						<path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
					</svg>
				</div>
				<div className={productModalStyles.container}>
					<div className={productModalStyles.imageContainer}>
						<img
							alt="product-image"
							className={productModalStyles.image}
							src={product.variants[0].image}
							crossOrigin="anonymous"
						/>
					</div>
					<div className={productModalStyles.optionContainer}>
						<h1 className={productModalStyles.name}>
							{product.title}
						</h1>
						<div className={productModalStyles.colorContainer}>
							<span className={productModalStyles.labelText}>
								Color
							</span>
							{productColors &&
								productColors.map((item, index) => {
									return (
										<button
											key={index}
											className={`${productModalStyles.productColor} ml-1 bg-[${item.color}]`}
											onClick={() =>
												setSelectedColor(item.color)
											}
										/>
									);
								})}
							{/* <button
								className={
									productModalStyles.productColor
								}></button>
							<button
								className={`${productModalStyles.productColor} ml-1 bg-gray-700`}></button>
							<button
								className={`${productModalStyles.productColor} ml-1 bg-indigo-500`}></button> */}
						</div>
						<div className={productModalStyles.sizeContainer}>
							<span className={productModalStyles.labelText}>
								Size
							</span>
							<div className={productModalStyles.selectDiv}>
								<select
									onChange={e =>
										setSelectedSize(e.target.value)
									}
									className={
										productModalStyles.selectContainer
									}>
									{productSizes &&
										productSizes.map((item, index) => {
											return (
												<option key={index}>
													{item.size}
												</option>
											);
										})}
								</select>
								<span className={productModalStyles.arrowSvg}>
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
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
							<QuantityPicker
								smooth
								max={5}
								value={1}
								onChange={value => setSelectedCount(value)}
							/>
						</div>
						<span className={productModalStyles.priceText}>
							{product.variants[0].price}
						</span>
						<div className={productModalStyles.buttonContainer}>
							<button
								className={productModalStyles.button}
								onClick={onPressAddToCart}>
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
	imageContainer: 'p-2 pr-5 justify-center',
	image: 'w-48 lg:h-auto h-40 object-cover object-center rounded',
	optionContainer: 'w-72',
	name: 'text-gray-900 text-2xl title-font font-medium mb-1',
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
	closeContainer: 'absolute top-0 right-0 cursor-pointer',
};

export { ProductModal };
