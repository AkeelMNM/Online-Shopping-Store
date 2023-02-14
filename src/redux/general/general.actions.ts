import { Dispatch } from 'redux';
import {
	FETCH_CONTENT_ERROR,
	FETCH_CONTENT_REQUEST,
	FETCH_CONTENT_SUCCESS,
} from './general.types';
import * as contentService from '../../services/ContentService';

export const fetchContents = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_CONTENT_REQUEST });

			const data = await contentService.fetchContent();

			dispatch({
				type: FETCH_CONTENT_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({ type: FETCH_CONTENT_ERROR });
		}
	};
};
