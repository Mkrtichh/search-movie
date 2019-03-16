const ERRORS = require('../../common/errors');
const {REQUIRE_PARAMS} = require('./params');

class Validators {
  static validateForGetMovie (req) {
    let err = false;
    for (const param of REQUIRE_PARAMS) {
      if (typeof req.param(param) === "undefined" || req.param(param) === null) {
        err = ERRORS.MISSING_PARAM.replace('$param_name', `"${param}"`);
        break;
      }
    }
    return err;
  }
}

module.exports = Validators;
