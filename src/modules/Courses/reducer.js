import { FETCH_COURSES, FETCH_AUTHORS, CREATE_COURSE } from './constants';

const initialState = {
  authors: [],
  courses: [],
};

function CourseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSES:
      console.log(action);
      return {
        ...state,
        courses: action.courses,
      };
    case FETCH_AUTHORS:
      console.log(action);
      return {
        ...state,
        authors: action.authors,
      };
    case CREATE_COURSE:
      console.log(action);
      return {
        ...state,
        courses: [
          ...state.courses, action.course,
        ],
      };
    default:
      return state;
  }
}

export default CourseReducer;
