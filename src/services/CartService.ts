import { CartItem } from '../types';

const API_NAME: string = process.env.API_ADDRESS || '';

export const fetchUsersCartItems = async (
	userId: string,
): Promise<Array<CartItem>> => {
	try {
		const response = await fetch(`${API_NAME}/cart/${userId}`, {
			method: 'GET',
		});

		const responseData = await response.json();
		console.log('user shopping cart items fetched', responseData);

		return responseData || [];
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const storeCartItems = async (item: CartItem): Promise<CartItem> => {
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

export const updateCartItem = async (
	id: string,
	item: CartItem,
): Promise<CartItem> => {
	try {
		const response = await fetch(`${API_NAME}/cart/${id}`, {
			method: 'PUT',
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

export const removeCartItem = async (id: string): Promise<void> => {
	try {
		const response = await fetch(`${API_NAME}/cart/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const responseData = await response.json();

		return responseData || {};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
