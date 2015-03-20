/**
 * Created by mbp-sm on 3/20/15.
 */
module.exports.findById= {
    description: 'Get available by Id',
    notes: 'Returns by the id passed in the path',
    tags: ['api'],
    handler: function (request, reply) {
      reply('Plugin '+request.method + " on " + request.path);
    }
};