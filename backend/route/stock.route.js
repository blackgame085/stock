const express = require('express')
const stockRoute = express.Router()

let Stock = require('../models/stock.model')

stockRoute.route('/').get((req, res) => {
    Stock.find((err, stock) => {
        if(err) {
            console.log(err)
        } else {
            res.json(stock)
        }
    })
})

stockRoute.route('/:id').get((req, res) => {
    let id = req.params.id
    Stock.findById(id, (err, stock) => {
        res.json(stock)
    })
})

stockRoute.route('/addstock').post((req, res) => {
    let stock = new Stock(req.body)
    stock.save().then(stock => {
        res.status(200).json({'stock': "Stock added successfully"})
    }).catch(err => {
        res.status(400).send('adding stock failure')
    })
})

stockRoute.route('/edit/:id').get((req, res) => {
    let id = req.params.id
    Stock.findById(id, (err, stock) => {
        res.json(stock)
    })
})

stockRoute.route('/update/:id').post((req, res) => {
    Stock.findById(req.params.id, (err, stock) => {
        if(!stock){
            res.status(404).send('data is not found')
        } else {
            stock.item_name = req.body.item_name
            stock.quantity = req.body.quantity
            stock.unit = req.body.unit
            stock.warning = req.body.warning

            stock.save().then(stock => {
                res.json('Stock updated')
            }).catch(err => {
                res.status(400).send("Update not possible")
            })
        }
    })
})

stockRoute.route('/delete/:id').get((req, res) => {
    Stock.findByIdAndRemove({_id: req.params.id}, (err, stock) => {
        if(err) {
            res.json(err)
        } else {
            res.json('Successfully removed')
        }
    })
})

module.exports = stockRoute