import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import LoginPage from '../pages/user/login';
const auth:any={login:false};
// Assume we have a function called handleLoginSubmit that we want to call on login form submit
function handleLoginSubmit(event:any) {
    event.preventDefault();
    // Code to handle login form submission goes here
  }
  
  // In our test, we can create a mock form element for the login form and attach our handleLoginSubmit function to it
  const mockLoginForm = document.createElement('form');
mockLoginForm.addEventListener('submit', handleLoginSubmit);

test('handleLoginSubmit is called on login form submit and shows an alert if fields are not filled', () => {
  // Simulate a login form submit event with empty fields
  const submitEvent = new Event('submit');
  mockLoginForm.dispatchEvent(submitEvent);

  // Check that our handleLoginSubmit function was called
  expect(handleLoginSubmit).toHaveBeenCalled();

  // Check that an alert was shown
  expect(window.alert).toHaveBeenCalledWith('Please fill in both email and password fields.');
});
  