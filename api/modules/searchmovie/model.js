'use strict';
const  Methods = require('../../common/query');
const { movieApi } = require('./params');


class SearchMovieModel {

  static async getMovieAutofill (req) {
    const name = req.query.name;
    return await Methods.getDataFromExternalApi('get', movieApi+name)
  }

  static async getMovie (req) {
    const name = req.query.name;
    return await Methods.getDataFromExternalApi('get', movieApi+name)
  }

  static async saveItem (name) {

    const query = `SELECT "search_store"."name","search_store"."count" FROM "search_store"
    WHERE "search_store"."name"=$1 limit 1`;

    const params = [name];

    const exist = (await Methods.rawQuery('searchmovie', query, params)).rows;

    if(exist && exist.length) {
      return await Methods.update('searchmovie', {name: name}, {count: exist[0].count+1});
    }
    else {
      return await Methods.insert('searchmovie', {name: name});
    }
  }
}
module.exports = SearchMovieModel;
