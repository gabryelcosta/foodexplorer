exports.up = function(knex) {
  return knex.schema.hasTable('dishes').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('dishes', function(table) {
        table.increments('id');
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('category').notNullable();
        table.decimal('price').notNullable();
        table.text('description').notNullable();
      });
}
});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('dishes');
};