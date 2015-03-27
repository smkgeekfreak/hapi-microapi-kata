var BDD = require('./../bdd');
var Hapi = require('hapi');
var server = require('../../server');
BDD.describe('Collect-data', function () {

   BDD.it('Load plugin', function (done) {
      var server = new Hapi.Server();
      server.connection({
         host: 'localhost',
         port: 3003
      });
      server.register({
         register: require('../../plugins/collect-data/index'),
         routes: {
            prefix: '/collect'
         }
      }, function (err) {
         done();
      });
   });

   BDD.it('plugin api index', function (done) {
      var options = {
         method: "GET",
         url: "/collect"
      };
      server.inject(options, function (response) {
         var result = response.result;
         BDD.expect(response.statusCode).to.equal(200);

         done();
      });
   });

   BDD.it('/collect/{id} endpoint loads', function (done) {
      var options = {
         method: "PUT",
         url: "/collect/ADKDIC23e2ladk2",
         payload: {
            data: "This is a string"
         }
      };
      server.inject(options, function (response) {
         var result = response.result;
         BDD.expect(response.statusCode).to.equal(200);

         done();
      });
   });
});
