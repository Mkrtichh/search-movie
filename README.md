# search-movie

# Tech stack
* Backend: Node.js LTS
* Node Framework: Sails.js
* DB: Postgres SQL
* Frontend : React JS (16.8.4) Webpack for bundling
* Server: Heroku

a [Sails v1](https://sailsjs.com) application

# Application Run

* `npm run client` default NODE_ENV is `localhost`
* If you want change env for frontend run `export NODE_ENV=development; Webpack` or any Webpack command.
* change base url for client side from src/configs

# Migration Scripts

For creating migration script run following command

`db-migrate create migrationScriptName` then go to folder `migration/sqls/` folder find
your sql files there will be two `up` and `down`. File name format will be
* `timestamp-migrationScripName-up.sql`
* `timestamp-migrationScripName-down.sql`

For running migration script run following commands.
* for up `db-migrate up`
* for down `db-migrate down`


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Mon Mar 11 2019 22:47:20 GMT+0400 (Armenia Standard Time) using Sails v1.1.0.

<!-- Internally, Sails used [`sails-generate@1.16.6`](https://github.com/balderdashy/sails-generate/tree/v1.16.6/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

