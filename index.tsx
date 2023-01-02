import * as React from 'react';
import { render } from 'react-dom';
import App from './src/App';
import { Provider } from 'react-redux';
import { initializeStore } from './src/redux/store';

const { store } = initializeStore();

const element = document.querySelector('#app');

element &&
	render(
		<Provider store={store}>
			<App />
		</Provider>,
		element,
	);
