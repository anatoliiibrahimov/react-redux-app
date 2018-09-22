import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCourses} from './actions';
import CourseList from './components/CourseList';
import {withRouter} from 'react-router-dom';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: [{id: 1}, {id: 2}],
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.fetchCourses();
    console.log(this.props.fetchCourses)
  }

  componentWillRecieveProps(nextProps) {
    console.log(nextProps);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    this.props.history.push("/course");
  }

  render() {
    const {courses} = this.state.courses;
    console.log(this.props.courses);
    console.log(this.state.courses)

    const peopleArray = this.props.courses && Object.keys(this.props.courses).map(i => this.props.courses[i]);
    console.log(peopleArray);
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}/>
        { this.props.courses && <CourseList courses={peopleArray} /> }
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object
};

const mapDispatchToProps = {
  fetchCourses: fetchCourses,
};

const mapStateToProps = state => ({
  courses: state.courseReducer.courses
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesPage));
