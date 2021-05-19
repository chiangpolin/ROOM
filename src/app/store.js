import {configureStore} from '@reduxjs/toolkit';
import landingReducer from './reducers/landingReducer';
import profileReducer from './reducers/profileReducer';
import projectReducer from './reducers/projectReducer';

export const store = configureStore(
  {
    reducer: {
      auth: landingReducer,
      profile: profileReducer,
      project: projectReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
