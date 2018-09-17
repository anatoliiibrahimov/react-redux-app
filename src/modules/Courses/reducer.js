import { LOAD_COURSES_SUCCESS } from 'constants';

const initialState = {
  authors: [],
  courses: [],
};

export default function courseRecourser(state = initialState, action) {
  switch(action.type) {
    case LOAD_COURSES_SUCCESS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
