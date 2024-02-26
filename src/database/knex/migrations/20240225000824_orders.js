exports.up = function(knex) {
  return knex.schema.hasTable('orders').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('orders', function(table) {
        table.increments('id').primary();
        table.integer('orderCode').unsigned().notNullable();
        table.integer('userId').unsigned().notNullable().references('id').inTable('users');
        table.integer('dishId').unsigned().notNullable().references('id').inTable('dishes');
        table.string('dishName').notNullable();
        table.string('userName').notNullable();
        table.timestamp('date').defaultTo(knex.fn.now());
        table.time('hour').defaultTo(knex.fn.now());
        table.enu('status', ['Pendente', 'Preparando', 'Entregue', 'Cancelado']).defaultTo('Pendente');
        table.integer('quantity').notNullable();
        table.decimal('price').notNullable();
        table.decimal('totalPrice').notNullable();
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders');
};