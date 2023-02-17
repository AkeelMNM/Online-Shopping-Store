import { Dispatch } from 'redux';
import {
	ADD_TO_USER_REQUEST,
	ADD_TO_USER_SUCCESS,
	ADD_TO_USER_ERROR,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_ERROR,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
} from './user.types';
import * as userService from '../../services/UserService';
import { User } from '../../types';

export const fetchUser = (id: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_USER_REQUEST });

			const data = await userService.fetchUser(id);

			dispatch({
				type: FETCH_USER_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_USER_ERROR });
		}
	};
};

export const addUser = (user: User) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: ADD_TO_USER_REQUEST });

			userService.storeUser(user);

			dispatch({
				type: ADD_TO_USER_SUCCESS,
				payload: user,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: ADD_TO_USER_ERROR });
		}
	};
};

export const updateUser = (id: string, user: User) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: UPDATE_USER_REQUEST });

			userService.updateUser(id, user);

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: user,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: UPDATE_USER_ERROR });
		}
	};
};

export const removeUser = (id: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: DELETE_USER_REQUEST });

			userService.removeUser(id);

			dispatch({
				type: DELETE_USER_SUCCESS,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: DELETE_USER_ERROR });
		}
	};
};
