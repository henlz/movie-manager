import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/action/alarm-add';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import MovieDialog from './components/MovieDialog';
import DeleteMovieDialog from './components/DeleteMovieDialog';

import './HomeScene.css';

class HomeScene extends Component {
  state = {
    movie: {},
    openModal: false,
    deleteModalOpen: false
  };

  componentDidMount() {
    this.props.loadMovies();
  }

  handleSave = (movie) => {
    this.props.saveMovie(movie);
    this.props.loadMovies();
  };

  openMovieDialog = (movie = {}) => {
    this.setState({
      openModal: true,
      movie: movie
    });
  };

  handleModalClose = () => {
    this.setState({
      openModal: false
    });
  };

  openDeleteMovieDialog = (movie = {}) => {
    this.setState({
      deleteModalOpen: true,
      movie: movie
    });
  };

  handleDeleteModalClose = () => {
    this.setState({
      deleteModalOpen: false
    });
  };

  deleteMovie = movie => {
    this.props.deleteMovie(movie);
    this.handleDeleteModalClose();
  };

  renderMovieList = () => {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '100%',
        overflowY: 'auto',
      },
    };

    return (
      <GridList cellHeight={180}
                style={styles.gridList}>

        {this.props.movies.map(movie => (
          <GridTile key={movie.id}
                    title={movie.title}
                    subtitle={<span>{movie.description}</span>}
                    actionIcon={
                      <div>
                        <IconButton onClick={() => this.openMovieDialog(movie)}>
                          <EditIcon color="white"/>
                        </IconButton>
                        <IconButton onClick={() => this.openDeleteMovieDialog(movie)}>
                          <DeleteIcon color="white"/>
                        </IconButton>
                      </div>
                    }>
            <img src={movie.imageData} alt={movie.title}/>

          </GridTile>
        ))}
      </GridList>
    );
  };

  render() {
    return (
      <div>
        <AppBar title="Movies"
                iconElementLeft={<noscript/>}
                iconElementRight={
                  <IconButton onClick={() => this.openMovieDialog()}>
                    <AddIcon color="white"/>
                  </IconButton>
                }/>
        {this.renderMovieList()}
        <MovieDialog buttonText="Add"
                     onSave={this.handleSave}
                     movie={this.state.movie}
                     onClose={this.handleModalClose}
                     isOpen={this.state.openModal}/>
        <DeleteMovieDialog movie={this.state.movie}
                           onClose={this.handleDeleteModalClose}
                           onDelete={this.deleteMovie}
                           isOpen={this.state.deleteModalOpen}/>
      </div>
    );
  }
}

HomeScene.defaultProps = {
  movies: new List()
};

HomeScene.propTypes = {
  movies: PropTypes.instanceOf(List),
  loadMovies: PropTypes.func.isRequired,
  saveMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired
};

export default HomeScene;
