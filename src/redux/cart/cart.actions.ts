import { Dispatch } from 'redux';
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
} from './cart.types';
import * as cartService from '../../services/CartService';
import { CartItem } from '../../types';

export const clearCartItems = () => {
	return { type: CLEAR_REDUX_STORE };
};

export const fetchUsersCartItems = (id: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_CART_REQUEST });

			const data = await cartService.fetchUsersCartItems(id);

			dispatch({
				type: FETCH_CART_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_CART_ERROR });
		}
	};
};

export const addItemToCart = (item: CartItem) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: ADD_TO_CART_REQUEST });

			cartService.storeCartItems(item);

			dispatch({
				type: ADD_TO_CART_SUCCESS,
				payload: item,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: ADD_TO_CART_ERROR });
		}
	};
};

export const updateCartItem = (id: string, item: CartItem) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: UPDATE_CART_ITEM_REQUEST });

			cartService.updateCartItem(id, item);

			dispatch({
				type: UPDATE_CART_ITEM_SUCCESS,
				payload: { id, item },
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: UPDATE_CART_ITEM_ERROR });
		}
	};
};

export const removeCartItem = (id: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: DELETE_CART_ITEM_REQUEST });

			cartService.removeCartItem(id);

			dispatch({
				type: DELETE_CART_ITEM_SUCCESS,
				payload: id,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: DELETE_CART_ITEM_ERROR });
		}
	};
};
