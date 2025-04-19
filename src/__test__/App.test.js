import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
  it('AppComponent boundary renders without crashing', () => {
    render(<App />);
  });

  it('AppComponent boundary contains the Form component', () => {
    render(<App />);
    const formElement = screen.getByText('Sign Up').closest('form');
    expect(formElement).toBeInTheDocument();
  });
});
