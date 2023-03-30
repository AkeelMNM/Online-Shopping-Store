import { AnyAction } from 'redux';
import {
	CLEAR_REDUX_STORE,
	FETCH_CART_ERROR,
	FETCH_CART_REQUEST,
	FETCH_CART_SUCCESS,
	ADD_TO_CART_REQUEST,
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_ERROR,
	UPDATE_CART_ITEM_REQUEST,
	UPDATE_CART_ITEM_SUCCESS,
	UPDATE_CART_ITEM_ERROR,
	DELETE_CART_ITEM_REQUEST,
	DELETE_CART_ITEM_SUCCESS,
	DELETE_CART_ITEM_ERROR,
	UPDATE_CART_PAYMENT_STATUS_ERROR,
	UPDATE_CART_PAYMENT_STATUS_REQUEST,
	UPDATE_CART_PAYMENT_STATUS_SUCCESS,
} from './cart.types';
import { CartItem } from '../../types';

const initialState = {
	cart: new Array<CartItem>(),
	isCartFetching: false,
	isAddingItemToCart: false,
	isCartItemUpdating: false,
	isCartItemRemoving: false,
	isCartPaymentStatusUpdating: false,
};

export const cartReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case CLEAR_REDUX_STORE:
			return (state = initialState);
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
		case UPDATE_CART_ITEM_REQUEST:
			return {
				...state,
				isCartItemUpdating: true,
			};
		case UPDATE_CART_ITEM_SUCCESS:
			return {
				...state,
				cart: state.cart.map(item =>
					item._id === action.payload.id ? action.payload.item : item,
				),
				isCartItemUpdating: false,
			};
		case UPDATE_CART_ITEM_ERROR:
			return {
				...state,
				isCartItemUpdating: false,
			};
		case DELETE_CART_ITEM_REQUEST:
			return {
				...state,
				isCartItemRemoving: true,
			};
		case DELETE_CART_ITEM_SUCCESS:
			return {
				...state,
				cart: state.cart.filter(value => value._id !== action.payload),
				isCartItemRemoving: false,
			};
		case DELETE_CART_ITEM_ERROR:
			return {
				...state,
				isCartItemRemoving: false,
			};
		case UPDATE_CART_PAYMENT_STATUS_REQUEST:
			return {
				...state,
				isCartPaymentStatusUpdating: true,
			};
		case UPDATE_CART_PAYMENT_STATUS_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				cart: state.cart.map(item =>
					action.payload.includes(item._id)
						? { ...item, isPaymentComplete: true }
						: item,
				),
				isCartPaymentStatusUpdating: false,
			};
		case UPDATE_CART_PAYMENT_STATUS_ERROR:
			return {
				...state,
				isCartPaymentStatusUpdating: false,
			};
		default:
			return state;
	}
};
