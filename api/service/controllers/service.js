'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx) {
        // Create a new record
        console.log("ctx>>",ctx.request.body);
        
        
        // Return the created record
        return result;
      }
};
