/**
 * Created by bogdanbiv on 07/02/15.
 */
module.exports = function(app) {
  'use strict';
  var bunyan = require('bunyan');
  var uuid = require('uuid');

  function reqSerializer(req) {
    return {
      method: req.method,
      url: req.url
    };
  }

  function envSerializer(env) {
    return {
      nodeEnv: env.NODE_ENV,
      liveReload: env.LIVE_RELOAD,
      serverPort: env.REST_API_PORT,
      dataSource: env.REST_DATASOURCE,
      databaseType: env.DB_TYPE,
      databaseHost: env.DB_HOST,
      databasePort: env.DB_PORT,
      databaseUser: env.DB_USER,
      databasePassword: (env.DB_PASSWORD ? "Try Again!": undefined)
    };
  }

  var logger = bunyan.createLogger({
    name: 'jasonRestApi',
    streams: [
      /*{
        stream: process.stdout,
        level: "debug"
      },*/
    ]
  });

  app.serverEnvLogger = logger.child({
    childName: 'serverEnvLogger',
    serializers: { env: envSerializer },
    streams: [
      {
        name: 'serverEnv',
        type: 'file',
        path: 'serverEnv.json.log',
        level: 'info'
      },
    ]
  });

  app.use(function(req, res, next) {
    req.log = logger.child({
      childName: 'models-access',
      reqId: uuid(),
      serializers: { req: reqSerializer },
      streams: [
        {
          name: 'access',
          type: 'file',
          path: 'access.json.log',
          level: 'info'
        },
      ]
    });
    next();
  });

  app.logger = logger;
  return app;
};
