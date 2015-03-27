New Hapi Application w/plugin api architecture (with or w/o Docker)
=================================
Getting environment up and running for a simple RESTful API. Each *microapi* you want can be added as a separate self-contained plugin.

Can be run locally or installed and run via Docker/Docker Compose.

>##Local Installation

1. Clone repo
2. Node / NPM developed & tested locally on v0.10.36, should work on anything higher (but not guaranteed).
3. $cd into project directory
4. $npm install

>##Docker Installation

1. [Docker](https://docs.docker.com/installation/#installation) ([boot2docker](https://docs.docker.com/installation/mac/#install-boot2docker) for OSX)
2. [Docker Compose](https://docs.docker.com/compose/)
3. Clone repo

>##Run Tests

1. From the project directory, run the command ***"$ npm test"***
 + *If this command does not work you may need to globally install **lab** test library. **$ npm install -g lab***

>##Run API Server Locally (Debug)

1. From the project directory, run the command ***"$ npm run debug"***
2. Navigate in a browser to the index page at [http://localhost:9011](http://localhost:9011), which redirects you to
the [API documentation](http://http://localhost:9011/docs/ui) via [Swagger](http://swagger.io)) to view review and/or
interactive utilize the API endpoints
  . or use e.g. ***curl http://localhost:9011/collect*** to hit the API endpoints

>##Run API Server Docker-Compose(boot2docker) (Debug)

1. The first time your run the **hapiserver** from docker-compose from the main project directory you need to run:
 + ***"$ docker-compose build"***
 + ***"$ docker-compose up"***
2. Subsequently, from the main project directory, you can simply run the command
 + ***"$ docker-compose start hapiserver"*** or ***"$ docker-compose start"***
2. To tail the docker logs:
 + ***"$ docker-compose logs"***
3. To find the ip address where boot2docker is running your server\
 + ***"$ boot2docker ip"***
4. Navigate in a browser to the index page at http://<boot2docker ip>:9011, which redirects you to the API documentation via [Swagger](http://swagger.io)) to view review and/or interactive utilize the API endpoints
  . or use e.g. ***curl http://<boot2docker ip>:9011/collect*** to hit the API endpoints

>>##Adding New Plugins

+ Create a new directory under the **/plugins**
+ Add 3 files
 + ***index.js*** - Contains the registration for the plugin
     ```javascript
   module.exports.register = function (plugin, options, next) { 
   ```
   + Endpoint routes for the plugin Contains the registration for the plugin
    ```javascript
   plugin.route({
      method: 'PUT',
      path: '/{id}',
      config: PluginFuncs.collectData
   }); 
   ```
   + You need to have a route for each plugin for the index path for swagger to pick up the api in it's documentation
    ```javascript
  plugin.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'index',
      notes: 'Returns a index',
      tags: ['api'],
      handler: function (request, reply) {
        reply('plugin index');
      }
    }
  });
```
 + ***funcs.js*** - Endpoint configuration and handlers
  ```javascript
   module.exports.findAll = {
      description: 'Get all',
      notes: 'Returns all information. Can be filterd by an hour and minute passed in query string',
      tags: ['api','list'],
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
   }
   ```
 + ***package.json*** - Plugin meta information
     ```javascript
   { "name": "publish-list", "version": "0.1.0" } 
   ```
