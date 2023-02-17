import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById('app')!);

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
);
