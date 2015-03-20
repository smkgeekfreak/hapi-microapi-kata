New Hapi Application w/Bacon.js on the side
=================================
Getting  environment up and running for a simple sample RESTful API.

>>##Installation

>>##Plugins
You need to have a route for each plugin for the index path for swagger to pick up the api in it's documentation

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
