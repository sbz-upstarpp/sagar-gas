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

            // create bill entry
            const billData = {
                date: result.created_at,
                bill_amount: totalAmount,
                bill_for: "deposit",
                customer: result.id
            }
            strapi.services.payment.create(billData);

            // create bill entry
            if (result.deposit_paid == "yes")
            {
                const paymentData = {
                    payment_date: result.created_at,
                    amount : deposit_amount,
                    customer: result.id
                }
                strapi.services.transaction.create(paymentData);
            }

        },
        beforeUpdate(params,data) {
            console.log("data before update customer",data,params);
        },
        afterUpdate(result, data) {
            
            console.log('after update customer',result)

        }
    }
};
