/**
 * Created by mbp-sm on 3/22/15.
 */
var BDD = require('./bdd');
var Hapi = require('hapi');

BDD.describe('Collect-device-data', function () {

   BDD.it('Load plugin', function (done) {
      var server = new Hapi.Server();
      server.connection({
         host: 'localhost',
         port: 3003
      });
      server.register({
         register: require('../plugins/collect-device-data'),
         routes: {
            prefix: '/collect'
         }
      }, function (err) {
         //BDD.expect(err).to.equal(null); //why is err undefined
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

   //
   //BDD.it('Main server host at index returns text', function (done) {
   //   var options = {
   //      method: "PUT",
   //      url: "/users/testuser",
   //      payload: {
   //         full_name: "Test User",
   //         age: 19,
   //         image: "dhown783hhdwinx.png"
   //      }
   //   };
   //
   //   server.inject(options, function(response) {
   //      var result = response.result,
   //         payload = options.payload;
   //
   //      Lab.expect(response.statusCode).to.equal(200);   Lab.expect(result.full_name).to.equal(payload.full_name);
   //      Lab.expect(result.age).to.equal(payload.age);
   //      Lab.expect(result.image).to.equal(payload.image);
   //      Lab.expect(result.count).to.equal(0);
   //
   //      done();
   //   });
   //});

});
