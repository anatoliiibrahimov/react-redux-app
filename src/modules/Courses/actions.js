import { database } from "../../../config/firebase";
import { LOAD_COURSES_SUCCESS, LOAD_AUTHOR_SUCCESS } from "./constants";

// export const addCourse = newCourse => async dispatch => {
//   database.push().set(newCourse);
// };
console.log(database);

export function fetchCourses () {
  return dispatch => {
    database.on('value', snapshot => {
      console.log(snapshot.val());
      dispatch({
        type: LOAD_COURSES_SUCCESS,
        payload: snapshot.val()
      })
    })
  }
}

// export const fetchAutor = (dispatch) => {
//     database.on("value", snapshot => {
//       dispatch({
//         type: LOAD_AUTHOR_SUCCESS,
//         payload: snapshot.val()
//       });
//     });
//   };
