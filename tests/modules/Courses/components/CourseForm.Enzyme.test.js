/* global describe it */
import expect from 'expect';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CourseForm from '../../../../src/modules/Courses/components/CourseForm';

configure({ adapter: new Adapter() });
function setup(saving) {
  const props = {
    course: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  return shallow(<CourseForm {...props} />);
}

describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});