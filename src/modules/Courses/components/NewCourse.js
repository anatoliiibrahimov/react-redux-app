import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchAuthors, createCourse} from '../actions';
import CourseForm from './CourseForm';
import {withRouter} from 'react-router-dom';
import toastr from 'toastr';

export class NewCourse extends React.Component {
  constructor(props, context) {
    super(props, context);
    const key =  Math.floor(Math.random() * Math.floor(100));
    this.state = {
      course: {key, id: key},
      errors: {},
      saving: false
    };
    this.saveCourse = this.saveCourse.bind(this);
    this.updateCourseState = this.updateCourseState.bind(this);
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
    this.props.createCourse(this.state.course);
    this.redirect();
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

NewCourse.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object
};


const mapStateToProps = (state, ownProps) => {
  return {
    authors: state.authors.authors,
  };
}

export default withRouter(connect(mapStateToProps, ({ createCourse }))(NewCourse));
