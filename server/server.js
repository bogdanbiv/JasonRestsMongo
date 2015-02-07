var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
if (typeof(process.env.NODE_ENV) !== 'string') {
  console.log('NODE_ENV undefined, exiting');
  process.exit(10); // forces exit
  return 10; // this will never be reached, just for show!
}
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

console.log('env ' + JSON.stringify(process.env.NODE_ENV));
console.log('CWD: ' + process.cwd());

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
