import {Map, List} from 'immutable';

export const GET_ALL_MOVIES_REQUEST = 'movie/GET_ALL_MOVIES_REQUEST';
export const INSERT_MOVIE_REQUESTED = 'movie/INSERT_MOVIE_REQUESTED';
export const UPDATE_MOVIE_REQUESTED = 'movie/UPDATE_MOVIE_REQUESTED';
export const DELETE_MOVIE_REQUESTED = 'movie/DECREMENT_REQUESTED';

const initialState = Map({
  movies: new List()
});

const getMoviesFromLocalStorage = () => new List(JSON.parse(localStorage.getItem('movies')));

export default (state = initialState, action) => {
  switch (action.type) {
    case INSERT_MOVIE_REQUESTED:
      return state.withMutations(map => {
        let movies = getMoviesFromLocalStorage();

        const newMovie = Object.assign({}, action.payload.movie);
        newMovie.id = Date.now();
        movies = movies.push(newMovie);

        localStorage.setItem('movies', JSON.stringify(movies));
        map.set('movies', movies);
        return map;
      });

    case UPDATE_MOVIE_REQUESTED:
      return state.withMutations(map => {
        let movies = getMoviesFromLocalStorage();

        const movieToUpdate = Object.assign({}, action.payload.movie);
        movies = movies.map(movie => {
          if (movie.id === movieToUpdate.id) {
            return movieToUpdate;
          }
          return movie;
        });

        localStorage.setItem('movies', JSON.stringify(movies));
        map.set('movies', movies);
        return map;
      });

    case DELETE_MOVIE_REQUESTED:
      return state.withMutations(map => {
        debugger;
        let movies = getMoviesFromLocalStorage();
        const movieToDelete = Object.assign({}, action.payload.movie);

        movies = movies.filter(movie => movie.id !== movieToDelete.id);

        localStorage.setItem('movies', JSON.stringify(movies));
        map.set('movies', movies);

        return map;
      });

    case GET_ALL_MOVIES_REQUEST:
      return state.withMutations(map => map.set('movies', getMoviesFromLocalStorage()));

    default:
      return state;
  }
}

export const insertMovie = movie => {
  return dispatch => {
    dispatch({
      type: INSERT_MOVIE_REQUESTED,
      payload: {movie}
    });
  };
};

export const updateMovie = movie => {
  return dispatch => {
    dispatch({
      type: UPDATE_MOVIE_REQUESTED,
      payload: {movie}
    });
  };
};

export const getMovies = () => {
  return dispatch => {
    dispatch({
      type: GET_ALL_MOVIES_REQUEST
    });
  };
};

export const deleteMovie = movie => {
  return dispatch => {
    dispatch({
      type: DELETE_MOVIE_REQUESTED,
      payload: {movie}
    });
  };
};
