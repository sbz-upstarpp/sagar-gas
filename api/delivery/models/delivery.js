'use strict';

const { LIMIT_COMPOUND_SELECT } = require("sqlite3");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeCreate(data) {
            console.log("data before create delivey", data);
        },
        afterCreate(result, data) {
            console.log("after create delivery", result, data);
            let totalAmount = data.supply_qty*data.rate;
            let dueAmount = totalAmount - data.amount_recived ;


            // create payment entry
            const paymentData = {
                date: data.date,
                bill_for : 'delivery',
                bill_amount: totalAmount,
                amount_received: data.amount_recived,
                amount_due: dueAmount,
                delivery: result.id,
                customer: data.customer
            }
            strapi.services.payment.create(paymentData);

            //update cutomer deposit cylinders
            let customer = data.customer
            let remainingQty = result.customer.deposit_cylinders + (data.supply_qty - data.return_qty)
            strapi.services.customer.update({id:customer},{
                deposit_cylinders : remainingQty
            });

        }
    }
};
