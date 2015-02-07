var DataSource = require('loopback-datasource-juggler').DataSource;

module.exports = (function(dsConfig) {
  'use strict';
  var _ = require('lodash');
  var dsAllConfig = require('./datasources.json');
  var dsInstanceConfig = _.extend({}, dsConfig, dsAllConfig);
  console.log('dsAllConfig:      ' + JSON.stringify(dsAllConfig));
  console.log('dsConfig:         ' + JSON.stringify(dsConfig));
  console.log('dsInstanceConfig: ' + JSON.stringify(dsInstanceConfig));
  return dsConfig;
})();
