import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import reducer from '../reducers';

//Create the store.
export default createStore(
    reducer,
    {},
    applyMiddleware(Thunk)
  );
