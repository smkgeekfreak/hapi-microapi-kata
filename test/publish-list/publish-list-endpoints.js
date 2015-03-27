 var BDD = require('../bdd');
 var Hapi = require('hapi');
 var server = require('../../server');

 BDD.describe('publish-list plugin', function () {

    BDD.before( function(done) {
       console.log("before");
       done();
    });

    BDD.it('Load', function (done) {
       var server = new Hapi.Server();
       server.connection({
          port: 3003
       });
       server.register({
          register: require('../../plugins/publish-list'),
          routes: {
             prefix: '/publish'
          }
       }, function (err) {
          done();
       });
    });
 });
 BDD.describe('pulbish-list plugin', function () {

    BDD.it('index loads', function (done) {
       var options = {
          method: "GET",
          url: "/publish"
       };
       server.inject(options, function (response) {
          var result = response.result;
          BDD.expect(response.statusCode).to.equal(200);

          done();
       });
    });

    BDD.it('/publish/all endpoint loads', function (done) {
       var id = 1;
       var options = {
          method: "GET",
          url: "/publish/all"
       };
       server.inject(options, function (response) {
          var result = response.result;
          BDD.expect(response.statusCode).to.equal(200);

          done();
       });
    });
 });