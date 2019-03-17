/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */


module.exports = {


  /**************************************************************************
   *                                                                         *
   * Tell Sails what database(s) it should use in production.                *
   *                                                                         *
   * (https://sailsjs.com/config/datastores)                                 *
   *                                                                         *
   **************************************************************************/
  datastores: {

    default: {
      url: 'postgresql://postgres:root@localhost:5432/search',
      // adapter: 'sails-mysql',
      // url: 'mysql://user:password@host:port/database',
      //--------------------------------------------------------------------------
      //  /\   To avoid checking it in to version control, you might opt to set
      //  ||   sensitive credentials like `url` using an environment variable.
      //
      //  For example:
      //  ```
      //  sails_datastores__default__url=mysql://admin:myc00lpAssw2D@db.example.com:3306/my_prod_db
      //  ```
      //--------------------------------------------------------------------------
      // ssl: true,

    },

  },



  models: {
      // datastore: 'somePostgreSqlServerLocal',
      migrate: 'safe',

    /***************************************************************************
     *                                                                          *
     * If, in production, this app has access to physical-layer CASCADE         *
     * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
     * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
     * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
     * choose to keep this enabled.)                                            *
     *                                                                          *
     ***************************************************************************/
    // cascadeOnDestroy: false,

  },

  blueprints: {
    shortcuts: false,
  },
  security: {
    cors: {
      allowOrigins: '*'
    },

  },

  session: {
    conString: 'postgres://postgres:root@localhost:5432/search',
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },
  sockets: {
  },



  /**************************************************************************
   *                                                                         *
   * Set the production log level.                                           *
   *                                                                         *
   * (https://sailsjs.com/config/log)                                        *
   *                                                                         *
   ***************************************************************************/
  log: {
    level: 'debug'
  },



  http: {

    /***************************************************************************
     *                                                                          *
     * The number of milliseconds to cache static assets in production.         *
     * (the "max-age" to include in the "Cache-Control" response header)        *
     *                                                                          *
     ***************************************************************************/
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year

    /***************************************************************************
     *                                                                          *
     * Proxy settings                                                           *
     *                                                                          *
     * If your app will be deployed behind a proxy/load balancer - for example, *
     * on a PaaS like Heroku - then uncomment the `trustProxy` setting below.   *
     * This tells Sails/Express how to interpret X-Forwarded headers.           *
     *                                                                          *
     * This setting is especially important if you are using secure cookies     *
     * (see the `cookies: secure` setting under `session` above) or if your app *
     * relies on knowing the original IP address that a request came from.      *
     *                                                                          *
     * (https://sailsjs.com/config/http)                                        *
     *                                                                          *
     ***************************************************************************/
    // trustProxy: true,

  },



  /**************************************************************************
   *                                                                         *
   * Lift the server on port 80.                                             *
   * (if deploying behind a proxy, or to a PaaS like Heroku or Deis, you     *
   * probably don't need to set a port here, because it is oftentimes        *
   * handled for you automatically.  If you are not sure if you need to set  *
   * this, just try deploying without setting it and see if it works.)       *
   *                                                                         *
   ***************************************************************************/
  // port: 80,



  /**************************************************************************
   *                                                                         *
   * Configure an SSL certificate                                            *
   *                                                                         *
   * For the safety of your users' data, you should use SSL in production.   *
   * ...But in many cases, you may not actually want to set it up _here_.    *
   *                                                                         *
   * Normally, this setting is only relevant when running a single-process   *
   * deployment, with no proxy/load balancer in the mix.  But if, on the     *
   * other hand, you are using a PaaS like Heroku, you'll want to set up     *
   * SSL in your load balancer settings (usually somewhere in your hosting   *
   * provider's dashboard-- not here.)                                       *
   *                                                                         *
   * > For more information about configuring SSL in Sails, see:             *
   * > https://sailsjs.com/config/*#?sailsconfigssl                          *
   *                                                                         *
   **************************************************************************/
  // ssl: undefined,


  custom: {
    baseUrl: 'http://localhost:1337'
  },

};
