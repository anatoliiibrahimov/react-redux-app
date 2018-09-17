import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCourses} from './actions';
import CourseList from './components/CourseList';
import {withRouter} from 'react-router-dom';

const connectState = state => ({
  courses: state.courses,
});

const connectDispatch = dispatch => ({
  fetchCourses: () => dispatch(fetchCourses()),
});

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: [{id: 1}, {id: 2}],
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  componentWillMount() {
    this.props.fetchCourses();
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    this.props.history.push("/course");
  }

  render() {
    // const {courses} = this.state.courses;

    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={[{id: 1}]} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withRouter(connect(connectState, connectDispatch)(CoursesPage));
