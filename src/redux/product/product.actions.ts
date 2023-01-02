import { Dispatch } from 'redux';
import {
	FETCH_PRODUCTS_ERROR,
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
} from './product.types';
import * as productService from '../../service/ProductService';

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
