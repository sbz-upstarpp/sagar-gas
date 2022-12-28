'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeCreate(data) {
            console.log("data before create payment",data);
        },
        afterCreate(result, data) {
            console.log("after create biiling", result, data);
            const customer = data.customer ;
            const amountDue = result.customer.due_amount + result.bill_amount
            console.log(amountDue,"<<<<<<<<amountDue");
            strapi.services.customer.update({id:customer},{
                due_amount : amountDue
            });
        },
    }
};
