import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from './Alert.js';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Alert component', () => {
  const mockState = {
    auth: {
      messages: [
        {id: '001', text: 'hello world'},
        {id: '002', text: 'this is a testing message'},
      ],
    },
  };

  const useSelectorMock = useSelector;
  const useDispatchMock = useDispatch;

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    useSelectorMock.mockImplementation((selector) => selector(mockState));
  });
  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  test('It should render Alert Cards', () => {
    render(<Alert />);
    expect(screen.getByTestId('001')).toBeInTheDocument();
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();

    expect(screen.getByTestId('002')).toBeInTheDocument();
    expect(screen.getByText(/this is a testing message/i)).toBeInTheDocument();
  });

  test('It should click button of Alert Card id of 001', () => {
    render(<Alert />);
    const handleClick = jest.fn();
    const button = screen.getByTestId('001');
    button.onclick = handleClick;
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
