exports.up = function(knex) {
  return knex.schema.hasTable('ordersHistory').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('ordersHistory', function(table) {
        table.increments('id').primary();
        table.integer('orderCode').unsigned().notNullable().references('orderCode').inTable('orders');
        table.integer('orderId').unsigned().notNullable().references('id').inTable('orders');
        table.integer('userId').unsigned().notNullable().references('id').inTable('users');
        table.text('orderDetails').notNullable();
        table.decimal('totalValue').notNullable();
        table.timestamp('orderDate').defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ordersHistory');
};