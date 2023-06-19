import { Product } from '../types';

const API_NAME: string = process.env.FASHION_STORE_API_ADDRESS || '';

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

export const fetchBestSellerProducts = async (): Promise<Array<Product>> => {
	try {
		const response = await fetch(`${API_NAME}/product/bestseller`, {
			method: 'GET',
		});

		console.log(`${API_NAME}/product/bestseller`);

		const responseData = await response.json();
		console.log('best seller products fetched', responseData);

		return responseData || [];
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const fetchFilteredProducts = async (
	query: string,
): Promise<Array<Product>> => {
	try {
		const response = await fetch(
			`${API_NAME}/product/category?name=${query}`,
			{
				method: 'GET',
			},
		);

		const responseData = await response.json();
		console.log('filtered products fetched', responseData);

		return responseData || [];
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getProduct = (id: string) => { };
