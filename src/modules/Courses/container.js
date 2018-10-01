import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CourseList from './components/CourseList';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: [{ id: 1 }, { id: 2 }],
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    this.props.history.push('/course');
  }

  render() {
    const { courses } = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}
        />
        { courses && <CourseList courses={courses} /> }
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  courses: state.courses.courses,
  authors: state.authors.authors,
});

export default withRouter(connect(mapStateToProps)(CoursesPage));
