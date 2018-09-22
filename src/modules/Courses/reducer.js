import { FETCH_COURSES } from './constants';

const initialState = {
  authors: [],
  courses: [],
};

export default function courseRecourser(state = initialState, action) {
  switch(action.type) {
    case FETCH_COURSES:
    console.log(action);
      return {
        ...state,
        courses: action.courses,
      };
    default:
      return state;
  }
}
