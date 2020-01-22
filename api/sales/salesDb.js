const db = require('../../data/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
};

function get() {
    return db('sales');
}

function getById(car_id) {
    return db('sales')
    .where({ car_id })
    .first();
}

function insert(sale) {
    return db('sales')
    .insert(sale)
    .then(sale => {
        return getById(sale[0]);
    })
}

function update(car_id, changes) {
    return db('sales')
    .where({ car_id })
    .update(changes);
}

function remove(car_id) {
    return db('sales')
    .where('car_id', car_id)
    .del();
}