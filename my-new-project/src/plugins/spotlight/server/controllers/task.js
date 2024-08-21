

'use strict';

module.exports = {
  async find(ctx) {
    try {
      const tasks = await strapi.plugin('spotlight').service('task').find(ctx.query);
      return ctx.send(tasks);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};