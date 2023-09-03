import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import {
	userReducer,
	// 	languageReducer,
	// 	reportReducer,
	// 	newNoticeReducer,
} from 'redux-components/reducers/user';
// import { headerReducer } from 'redux-components/reducers/header';
import { langDataReducer } from 'redux-components/reducers/langData';
// import { globalHeaderDataReducer } from 'redux-components/reducers/globalHeader';

const rootReducer = combineReducers({
	// user: userReducer,
});

export const configureStore = () => {
	return createStore(rootReducer, compose(applyMiddleware(thunk)));
};

const reduxWrapper = createWrapper(configureStore, {
	debug: process.env.NODE_ENV !== 'production',
});

export default reduxWrapper;
