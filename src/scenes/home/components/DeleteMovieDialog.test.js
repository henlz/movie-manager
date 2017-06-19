import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DeleteMovieDialog from './DeleteMovieDialog';

it('renders and matchs snapshot', () => {
  const movie = {};
  const component = renderer.create(
    <MuiThemeProvider>
      <DeleteMovieDialog movie={movie} isOpen={false}/>
    </MuiThemeProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
