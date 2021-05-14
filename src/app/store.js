import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import profileReducer from '../reducers/profileReducer';
import projectReducer from '../reducers/projectReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer,
    project: projectReducer,
  },
});
