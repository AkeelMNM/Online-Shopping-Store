import React, { useEffect, useState } from 'react';
import { Checkbox, ProductCard, ProductModal } from '../components';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import _ from 'lodash';
import { Product } from '../types';
import {
	fetchFilteredProducts,
	fetchProducts,
	fetchProductsFilters,
} from '../redux/product';

const Products = () => {
	const dispatch = useAppDispatch();
	const products: Product[] = useAppSelector(state => state.product.products);
	const productFilter = useAppSelector(state => state.product.productFilter);
	const [modalVisibility, setModalVisibility] = useState(false);
	const [productId, setProductId] = useState('');
	const [filter, setFilter] = useState<string[]>([]);

	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchProductsFilters());
	}, []);

	const onSelectFilter = (value: string): void => {
		let clone = filter;
		const isValueExist = clone.includes(value);

		if (isValueExist) {
			clone = clone.filter(item => item !== value);
		} else {
			clone.push(value);
		}

		setFilter(clone);

		if (clone.length <= 0) {
			dispatch(fetchProducts());
		} else {
			onPressFilter();
		}
	};

	const onPressFilter = (): void => {
		const searchValue = filter.join(';');
		dispatch(fetchFilteredProducts(searchValue));
	};

	const onPressProductCard = (id: string): void => {
		setProductId(id);
		setModalVisibility(true);
	};

	return (
		<div className={productStyles.mainContainer}>
			<div className={productStyles.gridContainer}>
				<div className={productStyles.filterContainer}>
					<h3 className={productStyles.filterTitle}>Gender</h3>
					<ul className={productStyles.filterOrderList}>
						{productFilter.gender &&
							productFilter.gender.map(
								(value: string, index: number) => {
									return (
										<li
											key={index}
											className={
												productStyles.filterList
											}>
											<Checkbox
												value={value}
												onSelect={() =>
													onSelectFilter(value)
												}
											/>
										</li>
									);
								},
							)}
					</ul>
					<h3 className={productStyles.filterTitle}>Category</h3>
					<ul className={productStyles.filterOrderList}>
						{productFilter.category &&
							productFilter.category.map(
								(value: string, index: number) => {
									return (
										<li
											key={index}
											className={
												productStyles.filterList
											}>
											<Checkbox
												value={value}
												onSelect={() =>
													onSelectFilter(value)
												}
											/>
										</li>
									);
								},
							)}
					</ul>
					<h3 className={productStyles.filterTitle}>Trends</h3>
					<ul className={productStyles.filterOrderList}>
						{productFilter.trends &&
							productFilter.trends.map(
								(value: string, index: number) => {
									return (
										<li
											key={index}
											className={
												productStyles.filterList
											}>
											<Checkbox
												value={value}
												onSelect={() =>
													onSelectFilter(value)
												}
											/>
										</li>
									);
								},
							)}
					</ul>
				</div>
				<div className={productStyles.productContainer}>
					<div className={productStyles.productGrid}>
						{products &&
							products.map((product, index) => {
								return (
									<ProductCard
										key={index}
										name={_.get(product, 'title', '')}
										image={_.get(
											product,
											'variants[0].image',
											'',
										)}
										onPress={() =>
											onPressProductCard(product.id)
										}
										price={_.get(
											product,
											'variants[0].price',
											'',
										)}
									/>
								);
							})}
					</div>
				</div>
			</div>
			<ProductModal
				visible={modalVisibility}
				productId={productId}
				onPressClose={() => setModalVisibility(false)}
			/>
		</div>
	);
};

const productStyles = {
	mainContainer: 'h-full',
	gridContainer: 'grid grid-cols-1 xl:grid-cols-5 lg:xl:grid-cols-5 pt-5',
	filterContainer:
		'col-span-1 px-2 bg-white shadow-md rounded px-8 pb-2 ml-1 mb-4 pt-2',
	filterTitle: 'mb-4 pt-1 font-semibold',
	filterOrderList:
		'grid gap-1 grid-cols-4 xl:grid-cols-1 lg:grid-cols-1 text-sm font-medium bg-white dark:text-white',
	filterList: 'w-full ml-2 rounded-t-lg border-gray-200 dark:border-gray-600',
	productContainer: 'col-span-4 px-2 overflow-auto h-screen',
	productGrid:
		'grid xl:grid-cols-4 lg:grid-cols-4 gap-4 xl:justify-between lg:justify-between bg-white rounded relative pt-2 px-2',
};

export default Products;
