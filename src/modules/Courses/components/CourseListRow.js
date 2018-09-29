import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseListRow = ({ course }) => (
  // console.log(course);
  <tr>
    <td><a href={course.watchHref}>Watch</a></td>
    <td><Link to={`/course/${course.id}`}>{course.title}</Link></td>
    <td>{course.authorId}</td>
    <td>{course.category}</td>
    <td>{course.length}</td>
  </tr>
);

CourseListRow.propTypes = {
  course: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CourseListRow;
