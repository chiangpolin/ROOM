import {combineReducers} from 'redux';
import landingReducer from './landingReducer';
import profileReducer from './profileReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  landingReducer,
  profileReducer,
  projectReducer,
});
