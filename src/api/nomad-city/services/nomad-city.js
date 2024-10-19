'use strict';

/**
 * nomad-city service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nomad-city.nomad-city');
