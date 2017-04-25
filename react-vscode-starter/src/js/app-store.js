import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from './reducer';

export const appStore = createStore(reducer, applyMiddleware(thunk));

// import { createStore } from 'redux';

// import { reducer } from './reducer';

// export const appStore = createStore(reducer);

//createStore() accepts a reducer function and produces a store for the application
