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
    var dateFrom =  Date.parse(moment().utc().startOf('month'));
    var dateEnd =  Date.parse(moment().utc().endOf('month'));
    const _ = require('lodash');

    const knex = strapi.connections.default;
    const customer = await strapi.query('customer').findOne(
      { id:body.customer},
      ['transactions']
    )
    const entries = await knex('payments')
      .leftJoin('customers', 'payments.customer', 'customers.id')
      .leftJoin('deliveries','payments.delivery','deliveries.id')
      .leftJoin('services','payments.service','services.id')
      .leftJoin('cylinder_and_service_parts','deliveries.cylinder_and_service_part','cylinder_and_service_parts.id')
      .where('payments.date', '>=',dateFrom)
      .where('payments.date', '<=',dateEnd)
      .where('customers.id', body.customer)
      .select(
        'customers.id as customer_id',
        'deliveries.id as delivery_id',
        'deliveries.date as delivery_date',         
        'deliveries.supply_qty',         
        'deliveries.rate',         
        'deliveries.cylinder_and_service_part',         
        // 'cylinder_and_service_parts.name as part_name',         
        'services.id as service_id',
        'services.connections',
        'services.regulator',
        'services.gas_pipe',
        'services.connection_book',
        'services.service_charge',
        'services.admin_charge',
        // 'services.*',
        'payments.*'
      )
    const result =  _.groupBy(entries, 'bill_for')
    result.customer = customer
    console.log('result>>>',result)
    return result;
  }
};
