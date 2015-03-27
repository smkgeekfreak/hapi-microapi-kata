var Joi = require('joi');

/**
 *
 * @type {{description: string, notes: string, tags: string[], validate: {payload: {data: *}}, handler: Function}}
 */
module.exports.collectData = {
   description: 'Collect data from Id',
   notes: 'Collects by the id passed in the path',
   tags: ['api', 'data'],
   validate: {
      params: {
         id: Joi.string().required().description('id')
      },
      payload: {
         data: Joi.string().description("data")
      }
   },
   handler: function (request, reply) {
      reply('Plugin ' + request.method + " on " + request.path + " for uid(" + request.params.id + ") found " + request.payload.data);
   }
};