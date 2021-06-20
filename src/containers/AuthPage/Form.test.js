import React from 'react';
import {useDispatch} from 'react-redux';
import {render, screen, fireEvent} from '@testing-library/react';
import {Form} from './Form.js';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Form component', () => {
  const handleClick = jest.fn();
  const useDispatchMock = useDispatch;

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
  });
  afterEach(() => {
    useDispatchMock.mockClear();
  });

  test('It should render sign in Form', () => {
    render(<Form type={'sign-in'} setType={handleClick} />);
    expect(
      screen.getByRole('button', {
        name: 'Sign In',
      })
    ).toBeInTheDocument();
  });

  test('It should change sign in email input value to jeffrey@gmail.com', () => {
    render(<Form type={'sign-in'} setType={handleClick} />);
    const input = screen.getByLabelText('sign-in-email');
    fireEvent.change(input, {target: {value: 'jeffrey@gmail.com'}});
    expect(input.value).toBe('jeffrey@gmail.com');
  });

  test('It should change sign in password input value to test123', () => {
    render(<Form type={'sign-in'} setType={handleClick} />);
    const input = screen.getByLabelText('sign-in-password');
    fireEvent.change(input, {target: {value: 'test123'}});
    expect(input.value).toBe('test123');
  });

  test('It should click create new account button', () => {
    render(<Form type={'sign-in'} setType={handleClick} />);
    const button = screen.getByRole('button', {
      name: 'Create New Account',
    });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('It should render sign up Form', () => {
    render(<Form type={'sign-up'} setType={handleClick} />);
    expect(
      screen.getByRole('button', {
        name: 'Sign Up',
      })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('It should change sign up name input value to Jeffrey', () => {
    render(<Form type={'sign-up'} setType={handleClick} />);
    const input = screen.getByLabelText('sign-up-name');
    fireEvent.change(input, {target: {value: 'Jeffrey'}});
    expect(input.value).toBe('Jeffrey');
  });

  test('It should change sign up email input value to jeffrey@gmail.com', () => {
    render(<Form type={'sign-up'} setType={handleClick} />);
    const input = screen.getByLabelText('sign-up-email');
    fireEvent.change(input, {target: {value: 'jeffrey@gmail.com'}});
    expect(input.value).toBe('jeffrey@gmail.com');
  });

  test('It should change sign up password input value to test123', () => {
    render(<Form type={'sign-up'} setType={handleClick} />);
    const input = screen.getByLabelText('sign-up-password');
    fireEvent.change(input, {target: {value: 'test123'}});
    expect(input.value).toBe('test123');
  });

  test('It should click use an existing account button', () => {
    render(<Form type={'sign-up'} setType={handleClick} />);
    const button = screen.getByRole('button', {
      name: 'Use an Existing Account',
    });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
