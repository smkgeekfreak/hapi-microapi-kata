/**
 *
 * @type {exports}
 */
//var PluginFuncs = require('./funcs');

module.exports.register = function (plugin, options, next) {
  var swaggerOptions = {
    basePath: 'http://' + options.host + ':' + options.port,
    apiVersion: options.version,
    documentationPath: '/docs/ui',
    endpoint: '/docs.json',
    payloadType: 'json',
    produces: 'json',
    info: {
      title: 'API',
      description: 'RESTful API for iteracting with this service'

    },
    authorizations: {
      type: 'basicAuth',
      passAs: 'query',
      keyname: 'apiKey'
    }
  };
  plugin.register({
    register: require('hapi-swagger'),
    options: swaggerOptions
  }, function (err) {
    if (err) {
      console.log(['error'], 'hapi-swagger load error: ' + err)
    } else {
      console.log(['start'], 'hapi-swagger interface loaded')
    }
  });
  next();
};


module.exports.register.attributes = {
  pkg: require('./package.json')
};