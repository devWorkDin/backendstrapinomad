'use strict';

/**
 * workplace service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::workplace.workplace');
