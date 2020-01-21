
exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
      table.increments('car_id');
      table.string('VIN', 128).index().notNullable().unique();
      table.string('make', 128).index().notNullable();
      table.string('model', 128).index().notNullable();
      table.integer('mileage');
      table.string('transmission_type', 128);
      table.string('title_status');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
