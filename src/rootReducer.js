import { combineReducers } from 'redux';
import courseReducer from './modules/Courses/reducer';

const rootReducer = combineReducers({
  courseReducer
});

export default rootReducer;
