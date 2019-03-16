/**
 * `tasks/register/linkAssets.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/link-assets.js
 *
 */
module.exports = function(webpack) {
  webpack.registerTask('linkAssets', [
    'sails-linker:devJs',
    'sails-linker:devStyles',
    'sails-linker:clientSideTemplates'
  ]);
};
