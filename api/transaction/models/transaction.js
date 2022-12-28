'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        afterCreate(result, data) {
            console.log("after create transaction",result,data)
            const customer = data.customer ;
            const amountPaid = data.amount;
            const knex = strapi.connections.default;
            knex('customers').where('id',customer).decrement('due_amount', amountPaid)
        },
    }
};
