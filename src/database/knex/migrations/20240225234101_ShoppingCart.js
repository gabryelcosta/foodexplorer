exports.up = function(knex) {
  return knex.schema.hasTable('shoppingCart').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('shoppingCart', function(table) {
        table.increments('id').primary().notNullable();
        table.integer('orderCode').notNullable();
        table.integer('userId').notNullable();
        table.string('userName').notNullable();
        table.integer('dishId').notNullable();
        table.string('dishName').notNullable();
        table.string('image');
        table.integer('quantity').notNullable();
        table.decimal('dishPrice').notNullable();
        table.decimal('totalValue').notNullable();

        table.foreign('userId').references('id').inTable('users');
        table.foreign('dishId').references('id').inTable('dishes');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('shoppingCart');
};