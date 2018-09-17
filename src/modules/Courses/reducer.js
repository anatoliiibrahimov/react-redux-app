import { LOAD_COURSES_SUCCESS } from 'constants';

const initialState = {
  authors: [],
  courses: [],
};

export default function courseReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_COURSES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
