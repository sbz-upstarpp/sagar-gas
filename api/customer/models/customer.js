'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeCreate(data) {
            console.log("data before create customer",data);
        },
        afterCreate(result, data) {
            console.log("after create customer", result, data);
            let totalAmount = result.deposit_amount;
            let amountRecived = result.deposit_paid == "yes" ?  result.deposit_amount : 0.00;
            let amountDue = totalAmount-amountRecived;

            // create payment entry
            const paymentData = {
                date: result.created_at,
                bill_amount: totalAmount,
                amount_received: amountRecived,
                amount_due: amountDue,
                bill_for: "deposit",
                customer: result.id
            }
            strapi.services.payment.create(paymentData);

        }
    }
};
