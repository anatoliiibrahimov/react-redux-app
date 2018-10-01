/* global describe it */
import expect from 'expect';
import { updateCourse } from '../../../src/modules/Courses/actions';
import { FETCH_COURSES, UPDATE_COURSE } from '../../../src/modules/Courses/constants';

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE action', () => {
      const course = { id: 'clean-code', title: 'Clean Code' };
      const expectedAction = {
        type: UPDATE_COURSE,
        course,
      };

      expect(updateCourse).toEqual(expectedAction);
    });
  });
});

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE action', () => {
      const courses = { course1: { id: 'clean-code', title: 'Clean Code' } };
      const expectedAction = {
        type: FETCH_COURSES,
        courses,
      };

      expect(updateCourse).toEqual(expectedAction);
    });
  });
});
