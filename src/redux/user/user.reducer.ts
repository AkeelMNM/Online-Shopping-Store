import { AnyAction } from 'redux';
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
import { User } from '../../types';

const initialState = {
	user: <User>{
		_id: '',
		fullName: '',
		email: '',
	},
	isUserFetching: false,
	isUserAdding: false,
	isUpdatingUser: false,
	isRemovingUser: false,
};

export const userReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case FETCH_USER_REQUEST:
			return {
				...state,
				isUserFetching: true,
			};
		case FETCH_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isUserFetching: false,
			};
		case FETCH_USER_ERROR:
			return {
				...state,
				isUserFetching: false,
			};
		case ADD_TO_USER_REQUEST:
			return {
				...state,
				isUserAdding: true,
			};
		case ADD_TO_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isUserAdding: false,
			};
		case ADD_TO_USER_ERROR:
			return {
				...state,
				isUserAdding: false,
			};
		case UPDATE_USER_REQUEST:
			return {
				...state,
				isUpdatingUser: true,
			};
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isUpdatingUser: false,
			};
		case UPDATE_USER_ERROR:
			return {
				...state,
				isUpdatingUser: false,
			};
		case DELETE_USER_REQUEST:
			return {
				...state,
				isRemovingUser: true,
			};
		case DELETE_USER_SUCCESS:
			return {
				...state,
				user: <User>{
					_id: '',
					fullName: '',
					email: '',
				},
				isRemovingUser: false,
			};
		case DELETE_USER_ERROR:
			return {
				...state,
				isRemovingUser: false,
			};
		default:
			return state;
	}
};
