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

    res.ok(await Model.getMovie(req));
  }

   static async getMovieAutofill (req, res) {

    //validate required field
    const invalid = Validators.validateForGetMovie(req);
    if (invalid) {
      return res.status(400).json({message: invalid});
    }

    res.ok(await Service.getMovieAutofill(req));
  }

   static async getSharedResourse (req, res) {

    //validate required field
    const invalid = Validators.validateForGetMovie(req);
    if (invalid) {
      return res.status(400).json({message: invalid});
    }
   const a = await Service.getSharedResourse(req);
    res.send(a);
  }
}
module.exports = SearchMovie;
