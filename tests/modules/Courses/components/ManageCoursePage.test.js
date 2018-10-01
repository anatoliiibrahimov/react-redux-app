/* global describe it */
import React from 'react';
import expect from 'expect';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';
import { ManageCoursePage } from '../../../../src/modules/Courses/components/ManageCoursePage';

configure({ adapter: new Adapter() });

describe('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      authors: [],
      actions: { saveCourse: () => (Promise.resolve()) },
      course: {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: '',
      },
    };
    const wrapper = mount(<ManageCoursePage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
