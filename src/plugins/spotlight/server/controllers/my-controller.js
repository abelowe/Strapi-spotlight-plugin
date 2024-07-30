'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('spotlight')
      .service('myService')
      .getWelcomeMessage();
  },
});
