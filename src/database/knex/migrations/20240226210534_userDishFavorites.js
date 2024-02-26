exports.up = function(knex) {
  return knex.schema.createTable('favorite_dishes', function(table) {
    table.increments('id');
    table.integer('user_id').notNullable();
    table.integer('dish_id').notNullable();
    table.string('dish_name').notNullable();
    table.string('image'); // Adiciona a coluna de imagem

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('dish_id').references('id').inTable('dishes');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorite_dishes');
};