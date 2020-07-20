import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import monitorReducer from './enhancers/monitorReducer';
import thunk from'redux-thunk';

export interface StoreModel {
	classes: any;
	ui: {
		loading: boolean;
		errors: string;
	};
	user: {
		authed: boolean;
		loading: boolean;
		creds: {};
	};
	data: {
		loading: boolean;
	};
};

const configureStore = (preloadedState: any) => {
	const reducers = combineReducers({
		ui: uiReducer,  
		user: userReducer,
		data: dataReducer,
	});

	const middleware = [thunk];
	const middlewareEnhancer = applyMiddleware(...middleware);
	const enhancers = [middlewareEnhancer, monitorReducer];

	return createStore(reducers, preloadedState, compose(...enhancers));
};

export default configureStore;