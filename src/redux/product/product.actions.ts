import { Dispatch } from 'redux';
import {
	FETCH_PRODUCTS_ERROR,
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FILTER_REQUEST,
	FETCH_PRODUCTS_FILTER_SUCCESS,
	FETCH_PRODUCTS_FILTER_ERROR,
	FETCH_BEST_SELLER_PRODUCTS_ERROR,
	FETCH_BEST_SELLER_PRODUCTS_REQUEST,
	FETCH_BEST_SELLER_PRODUCTS_SUCCESS,
	FETCH_FILTERED_PRODUCTS_ERROR,
	FETCH_FILTERED_PRODUCTS_REQUEST,
	FETCH_FILTERED_PRODUCTS_SUCCESS,
} from './product.types';
import * as productService from '../../services/ProductService';

export const fetchProducts = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_PRODUCTS_REQUEST });

			const data = await productService.fetchProducts();

			dispatch({
				type: FETCH_PRODUCTS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_PRODUCTS_ERROR });
		}
	};
};

export const fetchProductsFilters = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_PRODUCTS_FILTER_REQUEST });

			const data = await productService.fetchProductFilter();

			dispatch({
				type: FETCH_PRODUCTS_FILTER_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_PRODUCTS_FILTER_ERROR });
		}
	};
};

export const fetchBestSellerProducts = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_BEST_SELLER_PRODUCTS_REQUEST });

			const data = await productService.fetchBestSellerProducts();

			dispatch({
				type: FETCH_BEST_SELLER_PRODUCTS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_BEST_SELLER_PRODUCTS_ERROR });
		}
	};
};

export const fetchFilteredProducts = (query: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_FILTERED_PRODUCTS_REQUEST });

			const data = await productService.fetchFilteredProducts(query);

			dispatch({
				type: FETCH_FILTERED_PRODUCTS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_FILTERED_PRODUCTS_ERROR });
		}
	};
};
