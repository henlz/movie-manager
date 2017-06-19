import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MovieDialog from './MovieDialog';

describe('MovieDialog scene', function() {
  let component, wrapper, onCloseSpy, onSaveSpy;

  beforeEach(() => {
    onCloseSpy = jest.fn();
    onSaveSpy = jest.fn();

    component = (
      <MuiThemeProvider>
        <MovieDialog buttonText='Text'
                     onSave={onSaveSpy}
                     onClose={onCloseSpy}
                     isOpen={false}/>
      </MuiThemeProvider>
    );

    wrapper = mount(component);
  });

  it('renders and matchs snapshot', function() {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should set an Add title', function() {
    const dialogNode = wrapper.find('Dialog').node;

    expect(dialogNode.props.title).toBe('Add movie');
  });

  it('should set an Add title', function() {
    const movie = {
      title: 'movie title'
    };
    component = (
      <MuiThemeProvider>
        <MovieDialog buttonText='Text'
                     movie={movie}
                     onSave={() => false}
                     isOpen={true}/>
      </MuiThemeProvider>
    );

    wrapper = mount(component);

    const dialogNode = wrapper.find('Dialog').node;

    expect(dialogNode.props.title).toBe('Edit movie');
  });

  it('handleClose should call onClose prop', function() {
    const movieDialogNode = wrapper.find('MovieDialog').node;
    movieDialogNode.handleClose();

    expect(onCloseSpy.mock.calls.length).toBe(1);
  });

  it('onChangeDescription should set state with description', function() {
    const text = 'text';
    const event = {
      target: {
        value: text
      }
    };
    const movieDialogNode = wrapper.find('MovieDialog').node;

    movieDialogNode.onChangeDescription(event);

    expect(movieDialogNode.state.description).toBe(text);
  });

  it('onChangeTitle should set state with title', function() {
    const text = 'text';
    const event = {
      target: {
        value: text
      }
    };
    const movieDialogNode = wrapper.find('MovieDialog').node;

    movieDialogNode.onChangeTitle(event);

    expect(movieDialogNode.state.title).toBe(text);
  });

  it('handleClose should call onClose prop', function() {
    const movieDialogNode = wrapper.find('MovieDialog').node;
    movieDialogNode.handleClose();

    expect(onCloseSpy.mock.calls.length).toBe(1);
  });
});
