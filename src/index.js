import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import youtubeReducer from './redux/youtubeSlice';
import memberReducer from './redux/memberSlice';
import flickrReducer from './redux/flickrSlice';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		members: memberReducer,
		flickr: flickrReducer,
	}
})

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);