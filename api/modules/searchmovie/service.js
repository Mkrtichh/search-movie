'use strict';
const Model = require('./model');

class SearchMovieService {

  static async  saveItem (name) {
    return await Model.saveItem(name);
  }

  static async getMovieAutofill (req) {
    return await Model.getMovieAutofill(req);
  }

}
module.exports = SearchMovieService;
