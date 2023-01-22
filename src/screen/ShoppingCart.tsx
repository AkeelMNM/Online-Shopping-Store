import React from 'react';

const ShoppingCart = () => {
	return (
		<div className={cartStyles.mainContainer}>
			<div className={cartStyles.gridContainer}>
				<div className={cartStyles.filterContainer}></div>
				<div className={cartStyles.productContainer}></div>
			</div>
		</div>
	);
};

const cartStyles = {
	mainContainer: 'h-full',
	gridContainer: 'grid grid-cols-5 pt-5',
	filterContainer:
		'col-span-1 px-2 bg-white shadow-md rounded px-8 pb-2 ml-1 mb-4 pt-4',
	filterButton:
		'text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-sm text-sm px-2 py-1 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40',
	filterTitle: 'mb-4 pt-2 font-semibold',
	filterOrderList: 'w-28 text-sm font-medium bg-white dark:text-white',
	filterList: 'w-full rounded-t-lg border-gray-200 dark:border-gray-600',
	productContainer: 'col-span-4 px-2 overflow-auto h-screen',
	productGrid:
		'grid grid-cols-4 gap-4 justify-between bg-white rounded relative pt-2 px-2',
};

export default ShoppingCart;
