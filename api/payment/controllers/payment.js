'use strict';

const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getInvoice(ctx) {
        const body = ctx.request.body;
        const params = {
            customerId : body.customer,
            startDate : body.startDate ? body.startDate : "",
            endDate : body.endDate ? body.endDate : "",
        };
        return strapi.query("payment").where({cusomer:params.customerId})
        .find({});
    }
  };
 
