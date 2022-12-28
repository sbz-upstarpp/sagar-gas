'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        afterCreate(result, data) {
            const customer = data.customer ;
            const amountDue = result.customer.due_amount - data.amount
            strapi.services.customer.update({id:customer},{
                due_amount : amountDue
            });
        },
    }
};
