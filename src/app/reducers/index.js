import {combineReducers} from 'redux';
import profileReducer from './profileReducer';
import projectReducer from './projectReducer';

export default combineReducers({profileReducer, projectReducer});
