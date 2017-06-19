import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import App from './App';
import store from './store';

it('renders and matchs snapshot', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
