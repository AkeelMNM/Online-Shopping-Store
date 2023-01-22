import { AnyAction } from 'redux';
import {
	FETCH_CART_ERROR,
	FETCH_CART_REQUEST,
	FETCH_CART_SUCCESS,
	ADD_TO_CART_REQUEST,
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_ERROR,
} from './cart.types';
import { CartItem } from '../../types';

const initialState = {
	cart: new Array<CartItem>(),
	isCartFetching: false,
	isAddingItemToCart: false,
};

export const cartReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case FETCH_CART_REQUEST:
			return {
				...state,
				isCartFetching: true,
			};
		case FETCH_CART_SUCCESS:
			return {
				...state,
				cart: action.payload,
				isCartFetching: false,
			};
		case FETCH_CART_ERROR:
			return {
				...state,
				isCartFetching: false,
			};
		case ADD_TO_CART_REQUEST:
			return {
				...state,
				isAddingItemToCart: true,
			};
		case ADD_TO_CART_SUCCESS:
			return {
				...state,
				cart: state.cart.concat(action.payload),
				isAddingItemToCart: false,
			};
		case ADD_TO_CART_ERROR:
			return {
				...state,
				isAddingItemToCart: false,
			};
		default:
			return state;
	}
};
