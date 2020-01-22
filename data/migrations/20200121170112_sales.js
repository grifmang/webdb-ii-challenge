
exports.up = function(knex) {
    return knex.schema.createTable('sales', table => {
        table.integer('car_id').unsigned();
        table.foreign('car_id').references('cars.car_id');
        // table.string('vehicle_VIN');
        table.boolean('sold').defaultTo(false);
        table.string('soldFor', 128);
        table.timestamps();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales');
};
