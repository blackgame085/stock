const express = require('express')
const unitRoute = express.Router()

let Unit = require('../models/unit.model')

unitRoute.route('/').get((req, res) => {
    Unit.find((err, unit) => {
        if(err) {
            console.log(err)
        } else {
            res.json(unit)
        }
    })
})

unitRoute.route('/addUnit').post((req, res) => {
    let unit = new Unit(req.body)
    unit.save().then(unit => {
        res.status(200).json({'unit': "Unit add success"})
    }).catch(err => {
        res.status(400).send('add unit fail')
    })
})

module.exports = unitRoute