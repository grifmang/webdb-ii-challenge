
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {car_id: 1, VIN: '2343jhjh234jh234', make: 'Toyota', model: 'Yaris', mileage: 88000, transmission_type: 'manual', title_status: 'clean'},
        {car_id: 2, VIN: '1905jhjh2234dwsdg', make: 'Honda', model: 'Civic', mileage: 4000, transmission_type: 'manual', title_status: 'salvage'},
        {car_id: 3, VIN: '1234jhjh234jh234', make: 'Acura', model: 'RSX', mileage: 11524, transmission_type: 'automatic', title_status: 'clean'}
      ]);
    });
};
