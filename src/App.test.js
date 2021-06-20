import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from './store';
import App from './App';

describe('App component', () => {
  test('It should render App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      screen.getByText(/Plan and Draw with Designers/i)
    ).toBeInTheDocument();
  });
});
