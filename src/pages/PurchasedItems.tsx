import React from 'react';
import { useAppSelector } from '../redux/hook';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { HeaderFooter, Cart } from '../components';
import { CartItem } from '../types';

const PurchasedItems = () => {
	const navigate = useNavigate();
	const cart: CartItem[] = useAppSelector(state => {
		return state.cart.cart.filter((item: CartItem) => {
			return item.isPaymentComplete;
		});
	});

	if (cart.length <= 0) {
		return (
			<HeaderFooter>
				<div className={purchasedItemsStyles.container}>
					<div className={purchasedItemsStyles.textContainer}>
						<label className={purchasedItemsStyles.cartNotItemText}>
							You don't have any purchased items.
						</label>
					</div>
					<button
						className={purchasedItemsStyles.browseButton}
						onClick={() => navigate('/products')}>
						Browse Products
					</button>
				</div>
			</HeaderFooter>
		);
	} else {
		return (
			<HeaderFooter>
				<div className={purchasedItemsStyles.mainContainer}>
					<div
						className={purchasedItemsStyles.purchasedTextContainer}>
						<label className={purchasedItemsStyles.purchasedText}>
							Completed Purchased Orders
						</label>
					</div>
					<div className={purchasedItemsStyles.productContainer}>
						{cart &&
							cart.map((item, index) => {
								return (
									<Cart
										key={index}
										color={_.get(item, 'color', '')}
										image={_.get(item, 'image', '')}
										//isFreeShipping={item.isFreeShipping}
										quantity={_.get(item, 'quantity', 0)}
										size={_.get(item, 'size', '')}
										title={_.get(item, 'title', '')}
										price={_.get(item, 'price', 0)}
										onPressEdit={() => {}}
										enableEdit={false}
									/>
								);
							})}
					</div>
				</div>
			</HeaderFooter>
		);
	}
};

const purchasedItemsStyles = {
	mainContainer: 'flex flex-wrap flex-col h-full g-6 items-center h-screen',
	productContainer: 'xl:ml-0 xl:w-1/2 lg:w-1/2 md:w-8/12 md:mb-0 p-2',
	container:
		'container max-w-lg mx-auto flex flex-col h-screen items-center justify-center px-2',
	textContainer: 'text-center mt-4 mb-2',
	purchasedTextContainer: 'mt-4 mb-2',
	purchasedText: 'text-2xl dark:black font-medium',
	cartNotItemText: 'text-2xl dark:black',
	browseButton:
		'bg-transparent hover:bg-blue-100 hover:text-blue-700 hover:border-blue-500 text-blue-700 font-semibold hover:text-blue-700 py-2.5 ml-2 px-10 border border-blue-500 rounded-lg hover:border-blue-500',
};

export default PurchasedItems;
