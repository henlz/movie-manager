import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {List} from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HomeScene from './HomeScene';

describe('Home scene', function() {
  let movies, loadMoviesSpy, deleteMovieSpy, saveMovieSpy, component, wrapper;

  beforeEach(() => {
    movies = new List([]);
    loadMoviesSpy = jest.fn();
    deleteMovieSpy = jest.fn();
    saveMovieSpy = jest.fn();

    component = (
      <MuiThemeProvider>
        <HomeScene movies={movies}
              deleteMovie={deleteMovieSpy}
              saveMovie={saveMovieSpy}
              loadMovies={loadMoviesSpy}/>
      </MuiThemeProvider>
    );

    wrapper = mount(component);
  });

  it('renders and matchs snapshot', function() {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call loadMovies on componentDidMount', function() {
    expect(loadMoviesSpy.mock.calls.length).toBe(1);
  });

  it('deleteMovie should call deleteMovieSpy and close delete modal', function() {
    const homeNode = wrapper.find('HomeScene').node;

    homeNode.deleteMovie();

    expect(homeNode.state.deleteModalOpen).toBe(false);
    expect(deleteMovieSpy.mock.calls.length).toBe(1);
  });

  it('should set state with movie and open modal and then closes', function() {
    const homeNode = wrapper.find('HomeScene').node;

    const movie = {};
    homeNode.openMovieDialog(movie);

    expect(homeNode.state.openModal).toBe(true);
    expect(homeNode.state.movie).toBe(movie);

    let modalNode = wrapper.find('MovieDialog').node;
    expect(modalNode).ok;

    homeNode.handleModalClose();
    expect(homeNode.state.openModal).toBe(false);
    modalNode = wrapper.find('MovieDialog').node;
    expect(modalNode).not.ok;
  });

  it('handleSave should call onSave prop and loadMovies', function() {
    const homeNode = wrapper.find('HomeScene').node;

    const movie = {};
    homeNode.handleSave(movie);

    expect(saveMovieSpy.mock.calls.length).toBe(1);
    expect(saveMovieSpy.mock.calls[0][0]).toBe(movie);
    expect(loadMoviesSpy.mock.calls.length).toBe(2);
  });
});
