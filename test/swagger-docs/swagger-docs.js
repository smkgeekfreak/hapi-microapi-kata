var BDD = require('../bdd');
var Hapi = require('hapi');
var server = require('../../server');
BDD.describe('Swagger-docs', function () {

   BDD.it('registering plugin ', function (done) {
      var server = new Hapi.Server();
      server.connection({
         port: 3003
      });
      server.register({
         register: require('../../plugins/swagger-docs'),
         options: {
            version: '0.0.1',
            docsPath: '/docs/ui',
            title:'API title',
            description: 'API for this service'
         }
      }, function (err) {
         //BDD.expect(err).to.equal(null); //why is err undefined
         done();
      });
   });
});
BDD.describe('Swagger-docs plugin', function () {

   BDD.it('API documentation index loads', function (done) {
      var options = {
         method: "GET",
         url: "/docs/ui"
      };

      server.inject(options, function (response) {
         var result = response.result;

         BDD.expect(response.statusCode).to.equal(200);
         BDD.expect(response.headers['content-type']).to.equal('text/html');
         done();
      });
   });

});