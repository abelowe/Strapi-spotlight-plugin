'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.plugin('spotlight').service('task', require('./services/task'));
};