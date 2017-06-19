import {connect} from 'react-redux';

import HomeScene from './HomeScene';
import {getMovies, insertMovie, updateMovie, deleteMovie} from '../../modules/movie/reducer';

const mapStateToProps = state => {
  return {
    movies: state.getIn(['movieReducer', 'movies'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMovies: () => dispatch(getMovies()),
    saveMovie: movie => {
      if (!movie.id) {
        return dispatch(insertMovie(movie));
      }
      return dispatch(updateMovie(movie));
    },
    deleteMovie: movie => dispatch(deleteMovie(movie))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScene);
