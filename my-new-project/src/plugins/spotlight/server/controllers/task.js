'use strict';

module.exports = ({ strapi }) => ({
  async find(ctx) {
    try {
      return await strapi.plugin('spotlight').service('task').find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});