import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCourses } from './actions';
import CourseList from './components/CourseList';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: [{ id: 1 }, { id: 2 }],
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  componentDidMount() {
    this.props.fetchCourses();
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    this.props.history.push('/course');
  }

  render() {
    const { courses } = this.state;
    console.log(this.props.courses);
    console.log(courses);

    const coursesArray = this.props.courses
      && Object.keys(this.props.courses).map(i => this.props.courses[i]);
    console.log(coursesArray);
    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}
        />
        { this.props.courses && <CourseList courses={coursesArray} /> }
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchCourses,
};

const mapStateToProps = state => ({
  courses: state.courses.courses,
  authors: state.authors.authors,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesPage));
