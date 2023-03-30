import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';

import RegisterPage from '../pages/user/register';
function handleSubmit(event:any) {
    event.preventDefault();
    // Code to handle form submission goes here
  }
  
  // In our test, we can create a mock form element and attach our handleSubmit function to it
  const mockForm = document.createElement('form');
  mockForm.addEventListener('submit', handleSubmit);
  
  test('handleSubmit is called on form submit', () => {
    // Simulate a form submit event
    const submitEvent = new Event('submit');
    mockForm.dispatchEvent(submitEvent);
  
    // Check that our handleSubmit function was called
    expect(handleSubmit).toHaveBeenCalled();
  });