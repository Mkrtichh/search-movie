const request = require("request");
class Methods {
  static  async insert(modelName, data) {
      await sails.models[modelName].create(data).exec((err, response) => {
        if (err) return err;
        return response
      })
  }

   static  async update(modelName, criteria, valueToSet) {
      await sails.models[modelName]
        .update(criteria, valueToSet)
        .exec((err, response) => {
          if (err) return err;
          return response
        })
  }

   static async select(modelName, data, many = true, sort = {}) {
      await sails.models[modelName][many ? 'find' : 'findOne'](data).sort(sort)
        .exec((err, response) => {
          if (err) return err;
          return response
        })
  }

   static async delete(modelName, data) {
      await sails.models[modelName].destroy(data)
        .exec((err, response) => {
          if (err) return err;
          return response
        })
  }

  static rawQuery(modelName, query, values = []) {
    return new Promise((resolve, reject) => {
      sails.models[modelName].getDatastore().sendNativeQuery(query, values, (err, response) => {
          if (err) {
            return reject(err)
          }
          resolve(response)
        })
    })
  }

  static getDataFromExternalApi (callType = 'get', url) {
    return new Promise((resolve, reject) => {
      request[callType](url, (err, response) => {
        if (err) return reject(err);
        resolve(response)
      })
    })
  }
}

module.exports = Methods;
