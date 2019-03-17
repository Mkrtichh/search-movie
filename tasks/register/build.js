/**
 * `tasks/register/build.js`
 *
 * ---------------------------------------------------------------
 *
 * This Grunt tasklist will be executed if you run `sails www` or
 * `grunt build` in a development environment.
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/build.js
 *
 */
module.exports = function(webpack) {
  webpack.registerTask('build', [
    // 'polyfill:dev', //« uncomment to ALSO transpile during development (for broader browser compat.)
    'compileAssets',
    // 'babel',        //« uncomment to ALSO transpile during development (for broader browser compat.)
    'linkAssetsBuild',
    'clean:build',
    'copy:build'
  ]);
};