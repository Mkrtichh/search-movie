const SearchMovieModel = {
  attributes: {
    name: {
      type: 'String'
    },
    count: {
      type: 'number',
      defaultsTo: 1
    },
    'createdAt': { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
    'updatedAt': { type: 'ref', columnType: 'datetime', autoCreatedAt: true, },
    id: { type: 'number', autoIncrement: true, },
  },

  tableName: 'search_store'
};
 module.exports = {
   SearchMovieModel
 };
