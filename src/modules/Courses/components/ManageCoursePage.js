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

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    const { course } = this.state;
    course[field] = event.target.value;
    return this.setState({ course });
  }

  courseFormIsValid() {
    let formIsValid = true;
    const errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.updateCourse(this.state.course);
    this.redirect();
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Course saved');
    this.props.history.push('/courses');
  }

  render() {
    const { authors } = this.props;

    return (
      <CourseForm
        allAuthors={authors}
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
  course: PropTypes.objectOf(PropTypes.any).isRequired,
  authors: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  updateCourse: PropTypes.func.isRequired,
};

function getCourseId(courses, id) {
  console.log(courses);
  const course = courses.filter(c => c.id == id); // eslint-disable-line
  if (course) return course[0];
  return null;
}

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.match.params.id;
  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: '',
  };

  const courses = state.courses.courses;

  if (courseId && courses.length > 0) {
    course = getCourseId(courses, courseId);
  }

  return {
    course,
    authors: state.authors.authors,
  };
};

export default withRouter(connect(mapStateToProps, ({ updateCourse }))(ManageCoursePage));
