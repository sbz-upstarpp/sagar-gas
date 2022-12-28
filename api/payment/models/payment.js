'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeCreate(data) {
            console.log("data before create biiling",data);
        },
        afterCreate(result, data) {
            console.log("after create biiling", result, data);
            const customer = data.customer ;
            const amountDue = result.bill_amount;
            const knex = strapi.connections.default;
            knex('customers').where('id',customer).increment('due_amount', amountDue)
        },
    }
};
