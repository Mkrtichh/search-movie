'use strict';
const Model = require('./model');

class SearchMovieService {

  static async  saveItem (name) {
    return await Model.saveItem(name);
  }

  static async getMovieAutofill (req) {
    return await Model.getMovieAutofill(req);
  }

  static async getSharedResourse (req) {

    const response = await Model.getMovie(req);
    const movies = JSON.parse(response.body).Search;
    const data = {
      layout: null,
      movies: movies,
    };
    return await SearchMovieService.renderContent(data, 'templates/shared-resourse');
  }
  static async renderContent(data = {}, path) {
    Object.assign(data, {layout: null});
    return new Promise((resolve, reject) => {
      sails.hooks.views.render(path, data, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    })
  }

}
module.exports = SearchMovieService;
