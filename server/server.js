(function() {
  'use strict';
  var loopback = require('loopback');
  var boot = require('loopback-boot');
  var path = require('path');
  var mkdirp = require('mkdirp');
  var app = module.exports = loopback();

  if (typeof(process.env.NODE_ENV) !== 'string') {
    console.log('NODE_ENV undefined, exiting');
    process.exit(10); // forces exit
    return 10; // this will never be reached, just for show!
  }

  if (process.cwd().indexOf('runs') < 0) {
    var newRunPath = path.join(process.cwd(), 'runs', 'strong');
    mkdirp(newRunPath, function(err) {
      if(err) {
        console.log('could not create run dir');
        process.exit(10);
      } else {
        process.chdir(newRunPath);
        setup(app);
      }
    });
  } else {
    setup(app);
  }

  function setup(application) {
    require('./logging')(app);

    // Bootstrap the application, configure models, datasources and middleware.
    // Sub-apps like REST API are mounted via boot scripts.
    boot(app, __dirname);
    app.start = function () {
      // start the web server
      return app.listen(function () {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
      });
    };

    console.log('env ' + JSON.stringify(process.env.NODE_ENV));
    console.log('CWD: ' + process.cwd());

    app.serverEnvLogger.info({
      env: process.env,
      cwd: process.cwd()
    });

    // start the server if `$ node server.js`
    if (require.main === module) {
      app.start();
    }
  }
})();
