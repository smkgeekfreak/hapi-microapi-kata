/**
 * Created by mbp-sm on 3/20/15.
 */
var PluginFuncs = require('./funcs');

module.exports.register = function (plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'index',
      notes: 'Returns a index',
      tags: ['api', 'index'],
      handler: function (request, reply) {
        reply('plugin index').code(200);
      }
    }
  });
  plugin.route({
    method: 'GET',
    path: '/{id}',
    config: {
      description: 'swager test',
      notes: 'Returns a test swagger',
      tags: ['api'],
      handler: function (request, reply) {
        reply('Plugin ' + request.method + " on " + request.path).code(200);
      }
    }
  });

  plugin.route({
    method: 'GET',
    path: '/{id}/{name}',
    config: PluginFuncs.findById
  });

  next();
};

module.exports.register.attributes = {
  pkg: require('./package.json')
};