import { Dispatch } from 'redux';
import {
	FETCH_PRODUCTS_ERROR,
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FILTER_REQUEST,
	FETCH_PRODUCTS_FILTER_SUCCESS,
	FETCH_PRODUCTS_FILTER_ERROR,
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
