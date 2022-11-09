import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { rootReducer } from './reducers';

// const rootReducer = (state = initialState, action) => state;
const enhancer = devToolsEnhancer();
export const store = createStore(rootReducer, enhancer);
