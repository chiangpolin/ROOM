import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import profileReducer from '../reducers/profileReducer';
import projectReducer from '../reducers/projectReducer';
import thunk from 'redux-thunk';

export const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      project: projectReducer,
    },
    middleware: [thunk, ...getDefaultMiddleware()],
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
