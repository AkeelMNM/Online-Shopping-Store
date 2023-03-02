import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { productReducer } from './product';
import { cartReducer } from './cart';
import { generalReducer } from './general';
import { userReducer } from './user/user.reducer';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	user: userReducer, // persisting user
	product: productReducer,
	cart: cartReducer,
	general: generalReducer,
});

const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
