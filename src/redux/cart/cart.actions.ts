import { Dispatch } from 'redux';
import {
	FETCH_CART_ERROR,
	FETCH_CART_REQUEST,
	FETCH_CART_SUCCESS,
	ADD_TO_CART_REQUEST,
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_ERROR,
} from './cart.types';
import * as cartService from '../../service/CartService';
import { CartItem } from '../../types';

export const fetchCartItems = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_CART_REQUEST });

			const data = await cartService.fetchCartItems();

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

export const AddItemToCart = (item: CartItem) => {
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
