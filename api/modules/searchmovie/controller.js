'use strict';
const Model = require('./model');
const Service = require('./service');
const Validators = require('./validators');

class SearchMovie {

  static async getMovie (req, res) {

    //validate required field
    const invalid = Validators.validateForGetMovie(req);
    if (invalid) {
      return res.status(400).json({message: invalid});
    }
    await Service.saveItem(req.query.name);
     let a = await Model.getMovie(req);
    res.ok(a.body);
  }

  static async getMovieAutofill (req, res) {

    //validate required field
    const invalid = Validators.validateForGetMovie(req);
    if (invalid) {
      return res.status(400).json({message: invalid});
    }

    res.ok(await Service.getMovieAutofill(req));
  }

}
module.exports = SearchMovie;
