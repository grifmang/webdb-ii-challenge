
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {car_id: 1, sold: true, soldFor: 10000},
        {car_id: 2, sold: false, soldFor: 0},
        {car_id: 3, sold: false, soldFor: 0}
      ]);
    });
};
