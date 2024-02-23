exports.up = function(knex) {
  return knex.schema.createTable('dish_ingredients', function(table) {
    table.increments('id');
    table.integer('dish_id').unsigned().notNullable();
    table.foreign('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
    table.string('ingredient_name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('dish_ingredients');
};