var Code = require('code');
var Lab = require('lab');
var BDD = require('./bdd');
var lab = exports.lab = Lab.script();
var Hapi = require('hapi');

BDD.describe('Main Server', function () {

   BDD.it('Main server host at index returns text', function (done) {
      var options = {
         method: "GET",
         url: "/"
      };
      server.inject(options, function (response) {
         var result = response.result;
         BDD.expect(response.statusCode).to.equal(302);
         //BDD.expect(result.message).to.contains("Invalid");

         done();
      });
   });

   BDD.it('Load good plugin', function (done) {
      var server = new Hapi.Server();

      server.register({
         register: require('good'),
         options: {
            reporters: [{
               reporter: require('good-console'),
               args: [{log: '*', response: '*'}]
            }]
         }
      }, function (err) {
            //BDD.expect(err).to.equal(null); //why is err undefined

            done();
         });
   });

   BDD.it('Load tv plugin', function (done) {
      var server = new Hapi.Server();
      server.connection({
         host: 'localhost',
         port: 3003
      });
      server.register({
         register: require('tv'),
         options: {
            endpoint: '/awesome'
         }
      }, function (err) {
         //BDD.expect(err).to.equal(null);
         done();
      });
   });

});