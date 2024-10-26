'use strict';

/**
 * nomad-place service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nomad-place.nomad-place');
