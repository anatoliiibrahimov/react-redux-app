import { FETCH_COURSES, FETCH_AUTHORS, UPDATE_COURSE, CREATE_COURSE } from "./constants";

export const fetchCourses = courses => ({
  type: FETCH_COURSES,
  courses,
});
console.log(fetchCourses);

export const fetchAuthors = authors => ({
  type: FETCH_AUTHORS,
  authors,
});

export const updateCourse = (id, course) => ({
  type: UPDATE_COURSE,
  id,
  course,
});

export const createCourse = (course) => ({
  type: CREATE_COURSE,
  course,
});
