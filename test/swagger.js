/**
 * Created by mbp-sm on 3/21/15.
 */
var Code = require('code');
var Lab = require("lab");
lab = exports.lab = Lab.script();
server = require("../server");
/**
 * Begin Experiment
 */
lab.experiment('swagger', function() {
   // tests
   lab.before(function (done) {

      // Wait 1 second
      setTimeout(function () { done(); }, 1000);
   });

   lab.beforeEach(function (done) {

      // Run before every single test
      done();
   });

   lab.test('docs/ui endpoint', function(done) {
      var options = {
         method: "GET",
         url: "/docs/ui"
      };

      server.inject(options, function (response) {
         var result = response.result;

         Code.expect(response.statusCode).to.equal(200);
         //Code.expect(response.contentType).to.equal('text/html');
         Code.expect(response.headers['content-type']).to.equal('text/html');
         //console.log(response);
         done();
      });
   });
});