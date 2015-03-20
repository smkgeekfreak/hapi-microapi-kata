/**
 * Created by mbp-sm on 3/20/15.
 */
var Hapi = require('hapi');
var Tv = require('tv');
var Good = require('good');

var packFile = require('./package.json'),
  swaggerOptions = {
    basePath: 'http://' + packFile.host + ':' + packFile.port,
    apiVersion: packFile.version
  };
//create a hapi server
var apiServer = new Hapi.Server();

//configure hapi server connect
apiServer.connection({
  host: packFile.host,
  port: packFile.port,
  labels: ['api']
});

//var tvOptions = {endpoint: '/awesome'};
//apiServer.register(
//    {
//        register: Tv, options: {endpoint: '/awesome'}}, function (err) {
//        if (err) {
//            console.log('Couldn\'t register:', Tv);
//        }
//    });

apiServer.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply("Index should be replaced");
  },
  config: {}
});
/*
 Registering system plugins
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
apiServer.register(
  {register: require('./plugins/collect-device-data')}, {
    routes: {
      prefix: '/collect'
    }
  },

  function (err) {
    if (err) {
      throw err;
    }
  });

apiServer.register({
    register: require('./plugins/swagger-docs'),
    options:{
      host:packFile.host,
      port:packFile.port,
      version:packFile.version
    }}, {
  },

  function (err) {
    if (err) {
      throw err;
    }
  });
//apiServer.register([
//    {
//      register: require('./plugins/collect-device-data'),
//      routes: {
//        prefix: '/ext'
//      }
//    }
//  ],
//  function (err) {
//    if (err) {
//      throw err;
//    }
//  }
//);

apiServer.start(function () {
  var path = require("path");
  console.log("__dirname = %s", path.resolve(__dirname));
  console.log('Server running at:', apiServer.info.uri);
});

