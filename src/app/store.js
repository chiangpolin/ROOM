import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './reducers/profileReducer';
import projectReducer from './reducers/projectReducer';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    project: projectReducer,
  },
});
