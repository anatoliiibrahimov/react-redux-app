import { pluralsightAppRef } from "../../../config/firebase";
import { LOAD_COURSES_SUCCESS, LOAD_AUTHOR_SUCCESS } from "./constants";

// export const addCourse = newCourse => async dispatch => {
//   pluralsightAppRef.push().set(newCourse);
// };
console.log(pluralsightAppRef);
export const fetchCourses = () => async dispatch => {
  pluralsightAppRef.on("value", snapshot => {
    console.log(snapshot.val())
    dispatch({
      type: LOAD_COURSES_SUCCESS,
      payload: console.log(snapshot.val())
    });
  });
};

export const fetchAutor = () => async dispatch => {
    pluralsightAppRef.on("value", snapshot => {
      dispatch({
        type: LOAD_AUTHOR_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
