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
        async afterCreate(result,data) {
            console.log( "after create service",result,data);

            let total = data.total;
            if(total == 0)
            {
                const charges = await strapi.services.rate.find();
                console.log(charges)
                total += (charges.regulator * data.regulator);
                total += (charges.gas_pipe * data.gas_pipe);
                total += (charges.connetion_book * data.connection_book);
                total += Number(data.service_charge);
                total += Number(data.admin_charge);
            }
        
            const paymentData = {
                date : data.date,
                bill_amount : total,
                bill_for : "service",
                amount_received : data.amount_received,
                amount_due : (total-data.amount_received),
                service : result.id,
                customer : data.customer
            }
            console.log(paymentData,"payment dtaa");
            strapi.services.payment.create(paymentData);
        }
    }
};
