/**
 * Runs main hapi server. Registers plugins.
 * TODO: Write code to automatically load all plugins from 'plugins' directory
 *
 * @type {*|exports}
 */
var Hapi = require('hapi');
var Tv = require('tv');
var Good = require('good');

var packFile = require('./package.json'),
   swaggerOptions = {
      basePath: 'http://' + packFile.host + ':' + packFile.port,
      apiVersion: packFile.version
   };
/**
 * create a hapi server
 */
var apiServer = new Hapi.Server();
/**
 * Configure hapi server connections
 */
apiServer.connection({
   host: packFile.host,
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
      reply("Index should be replaced");
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
         register: Tv, options: {endpoint: '/awesome'}
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
         host: packFile.host,
         port: packFile.port,
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
/**
 * Start the hapiServer
 */
apiServer.start(function () {
   var path = require("path");
   console.log("__dirname = %s", path.resolve(__dirname));
   console.log('Server running at:', apiServer.info.uri);
});

