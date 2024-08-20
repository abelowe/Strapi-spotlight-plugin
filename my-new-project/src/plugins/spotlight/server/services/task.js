// path: src/plugins/spotlight/server/services/task.js

'use strict';

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany('plugin::spotlight.task', query);
  },
});