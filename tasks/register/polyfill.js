/**
 * `tasks/register/polyfill.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/polyfill.js
 *
 */
module.exports = function(webpack) {
  webpack.registerTask('polyfill:prod', 'Add the polyfill file to the top of the list of files to concatenate', ()=>{
    webpack.config.set('concat.js.src', [require('sails-hook-grunt/accessible/babel-polyfill')].concat(grunt.config.get('concat.js.src')));
  });
  webpack.registerTask('polyfill:dev', 'Add the polyfill file to the top of the list of files to copy and link', ()=>{
    webpack.config.set('copy.dev.files', webpack.config.get('copy.dev.files').concat({
      expand: true,
      cwd: require('path').dirname(require('sails-hook-grunt/accessible/babel-polyfill')),
      src: require('path').basename(require('sails-hook-grunt/accessible/babel-polyfill')),
      dest: '.tmp/public/polyfill'
    }));
    var devLinkFiles = webpack.config.get('sails-linker.devJs.files');
    webpack.config.set('sails-linker.devJs.files', Object.keys(devLinkFiles).reduce((linkerConfigSoFar, glob)=>{
      linkerConfigSoFar[glob] = ['.tmp/public/polyfill/polyfill.min.js'].concat(devLinkFiles[glob]);
      return linkerConfigSoFar;
    }, {}));
  });
};

