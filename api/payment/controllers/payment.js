'use strict';

const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getInvoice(ctx) {
        const moment = require('moment');
        const body = ctx.request.body;
        var dateFrom = moment.utc().startOf('month').toISOString();
        var dateEnd = moment.utc().endOf('month').toISOString();
        console.log(dateFrom,dateEnd)
        const params = {
            'id': body.customer,
            'payments.date' : {
                '>=': dateFrom,
                '<=': dateEnd
            },
        };
        console.log(params, "params")
        return strapi.query("customer").find(params);
    }
};

