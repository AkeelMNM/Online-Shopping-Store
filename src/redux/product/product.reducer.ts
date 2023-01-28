import { AnyAction } from 'redux';
import {
	FETCH_PRODUCTS_ERROR,
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FILTER_REQUEST,
	FETCH_PRODUCTS_FILTER_SUCCESS,
	FETCH_PRODUCTS_FILTER_ERROR,
} from './product.types';
import { Product } from '../../types';

const initialState = {
	products: new Array<Product>(),
	isProductFetching: false,
	productFilter: new Object(),
	isProductFilterFetching: false,
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
		case FETCH_PRODUCTS_FILTER_REQUEST:
			return {
				...state,
				isProductFilterFetching: true,
			};
		case FETCH_PRODUCTS_FILTER_SUCCESS:
			return {
				...state,
				productFilter: action.payload,
				isProductFilterFetching: false,
			};
		case FETCH_PRODUCTS_FILTER_ERROR:
			return {
				...state,
				isProductFilterFetching: false,
			};
		default:
			return state;
	}
};
