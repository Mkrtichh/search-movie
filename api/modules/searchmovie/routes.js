const routes = {
  'get /movie': 'SearchMovieController.getMovie',
  'get /data-autofill': 'SearchMovieController.getMovieAutofill',
  'get /shared-resourse/:name': 'SearchMovieController.getSharedResourse',
  // 'get /searched-movies': 'SearchMovieController.getSearchedMovies', for fuuture
};

Object.freeze(routes);
module.exports = routes;
