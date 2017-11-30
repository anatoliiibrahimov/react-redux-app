import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../src/reducers';
import initialState from '../../src/reducers/initialState';
import * as courseActions from '../../src/actions/courseActions';

describe('Store', function() {
  it('Should handle creating courses', function() {
    const store = createStore(rootReducer, initialState);
    const course = {
      title: "Clean Code"
    };

    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    const actual = store.getState().courses[0];
    const expected = {
      title: "Clean Code"
    };

    expect(actual).toEqual(expected);
  });
});
