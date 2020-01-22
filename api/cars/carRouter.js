const express = require('express');
const cars = require('./carDb');

const router = express.Router();

router.get('/', (req, res) => {
    cars.get()
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not get car records." })
    })
});

router.get('/:id', validateCarId, (req, res) => {
    const { id } = req.params;

    cars.getById(id)
    .then(car => {
        return res.status(200).json(car);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong looking for the car." })
    })
})

router.post('/', (req, res) => {
    if (!req.body.VIN || !req.body.make || !req.body.model) {
        return res.status(400).json({ error: "VIN, make and model are required." });
    }

    cars.insert(req.body)
    .then(response => {
        return res.status(201).json(response);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong adding car to database." })
    })
})

router.delete('/:id', validateCarId, (req, res) => {
    cars.remove(req.params.id)
    .then(() => {
        return res.status(200).json({ message: "Car Removed." })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Car was not removed." })
    })
})

router.put('/:id', validateCarId, (req, res) => {
    const { id } = req.params;
    cars.update(id, req.body)
    .then(() => {
        cars.getById(id)
        .then(response => {
            return res.status(200).json(response);
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Car was not updated." })
    })
})

function validateCarId(req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({ error: "No ID present in URL" });
    }

    cars.get()
    .then(carResults => {
        const carIds = [];
        if (carResults.length === 0) {
            return res.status(400).json({ error: "No cars in db." });
        }
        else if (carResults.length > 0) {
            carResults.map(car => {
                return carIds.push(car.id);
            })
            if (carIds.includes(Number(req.params.id))) {
                return next();
            } else {
                return res.status(400).json({ error: "Car ID not found." })}
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong." })
    })
}

module.exports = router;