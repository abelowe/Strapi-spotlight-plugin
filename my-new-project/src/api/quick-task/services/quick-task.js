'use strict';

/**
 * quick-task service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quick-task.quick-task');
