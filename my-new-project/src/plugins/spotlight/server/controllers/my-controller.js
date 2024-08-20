'use strict';

module.exports = {
  async index(ctx) {
    ctx.send({ message: 'Hello from myController.index!' });
  },
};