import { AnyAction } from 'redux';
import {
	FETCH_PRODUCTS_ERROR,
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
} from './product.types';
import { Product } from '../../interfaces';

const initialState = {
	products: new Array<Product>(),
	isProductFetching: false,
};

export const productReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case FETCH_PRODUCTS_REQUEST:
			return {
				...state,
				isProductFetching: true,
			};
		case FETCH_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.payload,
				isProductFetching: false,
			};
		case FETCH_PRODUCTS_ERROR:
			return {
				...state,
				isProductFetching: false,
			};
		default:
			return state;
	}
};
