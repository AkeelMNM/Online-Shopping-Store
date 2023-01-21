import React, { useState } from 'react';
import { Checkbox, ProductCard, ProductModal } from '../components';
import Shirt from '../assets/images/Shirt.png';
import { useAppSelector } from '../redux/hook';
import { Product } from '../types';

const GENDER: string[] = ['Male', 'Female', 'Unisex'];
const CATEGORY: string[] = [
	'Long Sleeve',
	'Slim Fit',
	'Short Sleeve',
	'Short',
	'Summer',
	'Polo',
	'Dress',
];
const TRENDS: string[] = ['Best Seller', 'Hot This Month'];

const Products = () => {
	const products: Product[] = useAppSelector(state => state.product.products);
	const [modalVisibility, setModalVisibility] = useState(false);
	const [productID, setProductID] = useState('');

	const onSelectGender = (value: string): void => { };

	const onSelectCategory = (value: string): void => {
		//TO DO: this function need to store the selected value in array not single value
	};

	const onSelectTrends = (value: string): void => { };

	const onPressFilter = (): void => { };

	const onPressProductCard = (id: string): void => {
		setProductID(id);
		setModalVisibility(true);
	};

	return (
		<div className={productStyles.mainContainer}>
			<div className={productStyles.gridContainer}>
				<div className={productStyles.filterContainer}>
					<button
						onClick={onPressFilter}
						className={productStyles.filterButton}>
						Filter Products
					</button>
					<h3 className={productStyles.filterTitle}>Gender</h3>
					<ul className={productStyles.filterOrderList}>
						{GENDER &&
							GENDER.map(value => {
								return (
									<li className={productStyles.filterList}>
										<Checkbox
											value={value}
											onSelect={() =>
												onSelectGender(value)
											}
										/>
									</li>
								);
							})}
					</ul>
					<h3 className={productStyles.filterTitle}>Category</h3>
					<ul className={productStyles.filterOrderList}>
						{CATEGORY &&
							CATEGORY.map(value => {
								return (
									<li className={productStyles.filterList}>
										<Checkbox
											value={value}
											onSelect={() =>
												onSelectCategory(value)
											}
										/>
									</li>
								);
							})}
					</ul>
					<h3 className={productStyles.filterTitle}>Trends</h3>
					<ul className={productStyles.filterOrderList}>
						{TRENDS &&
							TRENDS.map(value => {
								return (
									<li className={productStyles.filterList}>
										<Checkbox
											value={value}
											onSelect={() =>
												onSelectTrends(value)
											}
										/>
									</li>
								);
							})}
					</ul>
				</div>
				<div className={productStyles.productContainer}>
					<div className={productStyles.productGrid}>
						{products &&
							products.map((product: Product) => {
								return (
									<ProductCard
										key={product.id}
										productID={product.id}
										name={product.title}
										image={product.variants[0].image}
										onPress={onPressProductCard}
										price={product.variants[0].price}
									/>
								);
							})}
						{/* <ProductCard
							name="Casual Slim Fit Shirt"
							image={Shirt}
							onPress={onPressProduct}
							price={35}
						/>
						<ProductCard
							name="Casual Slim Fit Shirt"
							image={Shirt}
							onPress={onPressProduct}
							price={35}
						/> */}
					</div>
				</div>
			</div>
			<ProductModal visible={modalVisibility} productId={productID} onPressClose={() => setModalVisibility(false)} />
		</div>
	);
};

const productStyles = {
	mainContainer: 'h-full',
	gridContainer: 'grid grid-cols-5 pt-5',
	filterContainer:
		'col-span-1 px-2 bg-white shadow-md rounded px-8 pb-2 mb-4 pt-4',
	filterButton:
		'text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-sm text-sm px-2 py-1 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40',
	filterTitle: 'mb-4 pt-2 font-semibold',
	filterOrderList: 'w-48 text-sm font-medium bg-white dark:text-white',
	filterList: 'w-full rounded-t-lg border-gray-200 dark:border-gray-600',
	productContainer: 'col-span-4 px-2 overflow-auto h-screen',
	productGrid:
		'grid grid-cols-4 gap-4 justify-between bg-white rounded relative pt-2 px-2',
};

export default Products;
