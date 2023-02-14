import { AnyAction } from 'redux';
import {
	FETCH_CONTENT_ERROR,
	FETCH_CONTENT_REQUEST,
	FETCH_CONTENT_SUCCESS,
} from './general.types';
import { Content, ContentType } from '../../types';

const initialState = {
	carousel: new Array<ContentType>(),
	quality: new Array<ContentType>(),
	isContentFetching: false,
};

export const generalReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case FETCH_CONTENT_REQUEST:
			return {
				...state,
				isContentFetching: true,
			};
		case FETCH_CONTENT_SUCCESS:
			return {
				...state,
				carousel: action.payload.carouselContent,
				quality: action.payload.qualityContent,
				isContentFetching: false,
			};
		case FETCH_CONTENT_ERROR:
			return {
				...state,
				isContentFetching: false,
			};
		default:
			return state;
	}
};
