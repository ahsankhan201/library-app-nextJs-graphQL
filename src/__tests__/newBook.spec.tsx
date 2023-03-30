import React from 'react';
import { shallow } from 'enzyme';
import NewBook from '@/pages/newBook';

describe('Form', () => {
  it('adds form data when submitted', () => {
    const wrapper = shallow(<NewBook />);
    const inputName = wrapper.find('#name');
    const inputEmail = wrapper.find('#email');
    const submitButton = wrapper.find('#submit-button');

    inputName.simulate('change', { target: { value: 'John Doe' } });
    inputEmail.simulate('change', { target: { value: 'johndoe@example.com' } });
    submitButton.simulate('click');

    expect(wrapper.state('formData')).toEqual({
      name: 'John Doe',
      email: 'johndoe@example.com'
    });
  });
});
