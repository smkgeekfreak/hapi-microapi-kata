var Joi = require('joi');

module.exports.findAll = {
  description: 'Get all',
  notes: 'Returns all information. Can be filterd by an hour and minute passed in query string',
  tags: ['api','device-list'],
  handler: function (request, reply) {
    reply('Plugin ' + request.method + " on " + request.path + " with " + request.query.hour +
    " and " + request.query.minute );
  },
  validate: {
    query: {
      hour: Joi.number().min(0).max(23),
      minute: Joi.number().min(0).max(59)
    }
  }
};