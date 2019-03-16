const routes = {
  'get /get-movie': 'SearchMovieController.getMovie',
  'get /data-autofill': 'SearchMovieController.getMovieAutofill',
  // 'get /searched-movies': 'SearchMovieController.getSearchedMovies', for fuuture
};

Object.freeze(routes);
module.exports = routes;
