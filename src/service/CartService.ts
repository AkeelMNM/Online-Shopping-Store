import { CartItem } from '../types';

const API_NAME: string = process.env.API_ADDRESS || '';

export const fetchCartItems = async (): Promise<Array<CartItem>> => {
	try {
		const response = await fetch(`${API_NAME}/cart`, {
			method: 'GET',
		});

		const responseData = await response.json();
		console.log('products fetched', responseData);

		return responseData || [];
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const storeCartItems = async (
	item: CartItem,
): Promise<Array<CartItem> | string> => {
	try {
		const response = await fetch(`${API_NAME}/cart`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item),
		});

		const responseData = await response.json();

		return responseData || {};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
