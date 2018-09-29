import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import { updateCourse } from '../actions';
import CourseForm from './CourseForm';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
    };

    this.saveCourse = this.saveCourse.bind(this);
    this.updateCourseState = this.updateCourseState.bind(this);
  }

  componentWillReceiveProps(prevProps, nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if(!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    const courseId = this.state.course.id;
    console.log(courseId);
    this.props.updateCourse(courseId, this.state.course);
    this.redirect()
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.props.history.push("/courses");
  }

  render() {
    console.log(this.props.authors)
    const authorsArray = this.props.authors && Object.keys(this.props.authors).map(i => this.props.authors[i]);
    console.log(authorsArray);
    return (
      <CourseForm 
        allAuthors={authorsArray}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object
};

function getCourseId(courses, id) {
  console.log(courses);
  const course = courses.filter(course => course.id == id);
  if (course) return course[0];
  return null;
}

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.match.params.id;
  console.log(ownProps)
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  console.log(courseId);
  console.log(state.courseReducer)
  const courses = Object.keys(state.courses.courses).map(i => state.courses.courses[i]);
  console.log(courses);
  if (courseId && courses.length > 0 ) {
    course = getCourseId(courses, courseId);
  }

  return {
    course: course,
    authors: state.authors.authors,
  };
}

export default withRouter(connect(mapStateToProps, ({ updateCourse }))(ManageCoursePage));
