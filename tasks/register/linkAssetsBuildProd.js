/**
 * `tasks/register/linkAssetsBuildProd.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/link-assets-build-prod.js
 *
 */
module.exports = function(webpack) {
  webpack.registerTask('linkAssetsBuildProd', [
    'sails-linker:prodJsBuild',
    'sails-linker:prodStylesBuild',
    'sails-linker:clientSideTemplatesBuild'
  ]);
};
