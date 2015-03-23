/**
 * Runs main hapi server. Registers plugins.
 * TODO: Write code to automatically load all plugins from 'plugins' directory
 *
 * @type {*|exports}
 */
var Hapi = require('hapi');
var Boom = require('boom');

// Load options from package.json
var packFile = require('./package.json');
var config = {
   port : packFile.port
};

/**
 * create a hapi server
 */
var apiServer = new Hapi.Server({
   // This configuration object will be accessible on the server object
   // using server.settings.app - yes, even in your plugins!
   app: config
});
/**
 * Configure hapi server connections
 */
apiServer.connection({
   //host: packFile.host, // using this causes it not to work on docker
   port: packFile.port,
   labels: ['api']
});
/**
 *  Register main index route
 */
apiServer.route({
   method: 'GET',
   path: '/',
   handler: function (request, reply) {
      //reply(Boom.unauthorized('Invalid path'));
      reply.redirect('/docs/ui');
   },
   config: {}
});
/**
 * Registering system plugins
 */
apiServer.register([
      {
         register: require('good'),
         options: {
            reporters: [{
               reporter: require('good-console'),
               args: [{log: '*', response: '*'}]
            }]
         }
      },
      {
         register: require('tv'), options: {endpoint: '/awesome'}
      }
   ], function (err) {
      if (err) {
         console.log('Problem registering system plugins');
      }
   }
);
/**
 *
 */
apiServer.register(
   {
      register: require('./plugins/collect-device-data')}, {
      routes: {
         prefix: '/collect'
      }
   }, function (err) {
      if (err) {
         console.log('Problem registering collect-device-data plugin');
         throw err;
      }
   });
/**
 *
 */
apiServer.register(
   {register: require('./plugins/publish-device-list')}, {
      routes: {
         prefix: '/publish'
      }
   },

   function (err) {
      if (err) {
         console.log('Problem registering publish-device-list plugin');
         throw err;
      }
   });
/**
 *
 */
apiServer.register({
      register: require('./plugins/swagger-docs'),
      options: {
         version: packFile.version,
         docsPath: '/docs/ui',
         title:'API title',
         description: 'API for this service'
      }
   }, {
      //Nothing
   },

   function (err) {
      if (err) {
         console.log('Problem registering swagger-docs plugin');
         throw err;
      }
   });

apiServer.ext('onRequest', function (request, reply) {
   // Change all requests to '/test'
   //request.setUrl('/test');
   console.log("onRequest called");
   return reply.continue();
});
// If (!module.parent) {…} conditional makes sure that if the script is
// being required as a module by another script, we don’t start the server.
// This is done to prevent the server from starting when we’re testing it; with Hapi,
// we don’t need to have the server listening to test it.
if (!module.parent) {
   // Start Hapi server
   apiServer.start(function () {
      var path = require("path");
      console.log("__dirname = %s", path.resolve(__dirname));
      console.log('Server running at:', apiServer.info.uri);
      console.log('Server config\'d with :', apiServer.settings.app);
   });
}

module.exports = apiServer;
