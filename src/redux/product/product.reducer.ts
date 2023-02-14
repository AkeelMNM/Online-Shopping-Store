import { AnyAction } from 'redux';
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
import { Product } from '../../types';

const initialState = {
	products: new Array<Product>(),
	isProductFetching: false,
	productFilter: new Object(),
	isProductFilterFetching: false,
	bestSeller: new Array<Product>(),
	isBestSellerProductFetching: false,
	isFilteredProductFetching: false,
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
		case FETCH_BEST_SELLER_PRODUCTS_REQUEST:
			return {
				...state,
				isBestSellerProductFetching: true,
			};
		case FETCH_BEST_SELLER_PRODUCTS_SUCCESS:
			return {
				...state,
				bestSeller: action.payload,
				isBestSellerProductFetching: false,
			};
		case FETCH_BEST_SELLER_PRODUCTS_ERROR:
			return {
				...state,
				isBestSellerProductFetching: false,
			};
		case FETCH_FILTERED_PRODUCTS_REQUEST:
			return {
				...state,
				isFilteredProductFetching: true,
			};
		case FETCH_FILTERED_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.payload,
				isFilteredProductFetching: false,
			};
		case FETCH_FILTERED_PRODUCTS_ERROR:
			return {
				...state,
				isFilteredProductFetching: false,
			};
		default:
			return state;
	}
};
