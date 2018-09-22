import { FETCH_COURSES } from "./constants";

export const fetchCourses = courses => ({
    type: FETCH_COURSES,
    courses,
  });
console.log(fetchCourses);

