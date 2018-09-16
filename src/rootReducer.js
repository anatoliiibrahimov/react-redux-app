import {combineReducers} from 'redux';
import courseReducer from './modules/Courses/reducer';
import ajaxCallsInProgress from './services/ajaxStatusReducer';

const rootReducer = combineReducers({
  courseReducer, ajaxCallsInProgress
});

export default rootReducer;
