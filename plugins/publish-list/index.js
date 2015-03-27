var PluginFuncs = require('./funcs');

module.exports.register = function (plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'index',
      notes: 'Returns a index',
      tags: ['api','index'],
      handler: function (request, reply) {
        reply('plugin index');
      }
    }
  });
  plugin.route({
    method: 'GET',
    path: '/all',
    config: PluginFuncs.findAll
  });

  next();
};

module.exports.register.attributes = {
  pkg: require('./package.json')
};