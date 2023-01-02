import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './product';

export const initializeStore = () => {
	const store = configureStore({
		reducer: {
			product: productReducer,
		},
	});

	return { store };
};
