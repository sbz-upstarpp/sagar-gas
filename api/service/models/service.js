'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeCreate(data) {

            console.log("data before create service",data);
        },
        afterCreate(result,data) {
            console.log( "after create service",result,data);
            const paymentData = {
                date : data.date,
                bill_amount : data.total,
                amount_received : data.amount_received,
                amount_due : (data.total-data.amount_received),
                service : result.id,
                customer : data.customer
            }
            strapi.services.payment.create(paymentData);
        }
    }
};
