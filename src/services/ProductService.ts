import { Product } from '../types';

const API_NAME: string = process.env.API_ADDRESS || '';

export const fetchProducts = async (): Promise<Array<Product>> => {
	try {
		const response = await fetch(`${API_NAME}/product`, {
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

export const fetchProductFilter = async (): Promise<Array<Product>> => {
	try {
		const response = await fetch(`${API_NAME}/product/category/filter`, {
			method: 'GET',
		});

		const responseData = await response.json();
		console.log('products filter fetched', responseData);

		return responseData || [];
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getProduct = (id: string) => {};
