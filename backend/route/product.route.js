const express = require('express')
const productRoute = express.Router()

let Product = require('../models/product.model')

productRoute.route('/').get((req, res) => {
    Product.find((err, product) => {
        if(err) {
            console.log(err)
        } else {
            res.json(product)
        }
    })
})

productRoute.route('/:id').get((req,res) => {
    let id = req.params.id
    Product.findById(id, (err, product) => {
        res.json(product)
    })
})

productRoute.route('/addProduct').post((req,res) => {
    let product = new Product(req.body)
    product.save().then(product => {
        res.status(200).json({'Product': "Product Add successfully"})
    }).catch(err => {
        res.status(400).send('adding product failure')
    })
})

productRoute.route('/edit/:id').get((req,res) => {
    let id = req.params.id
    Product.findById(id, (err , product) => {
        res.json(product)
    })
})

productRoute.route('/update/:id').post((req,res) => {
    Product.findById(req.params.id, (err, product) => {
        if(!product) {
            res.status(404).send('data is not found')
        } else {
            const test = req.body.product_detail
            product.product_name = req.body.product_name
            product.product_detail.product_item_name = req.body.product_detail.product_item_name
            product.product_detail = req.body.product_item_quantity
            product.product_detail = req.body.product_item_unit
            product.product_show = req.body.product_show

            product.save().then(product => {
                res.json('Product Updated')
            }).catch(err => {
                res.status(400).send('Update fail')
            })
        }
    })
})

productRoute.route('/delete/:id').get((req,res) => {
    Product.findByIdAndRemove({_id: req.params.id}, err => {
        if(err) {
            res.json(err)
        } else {
            res.json('Removed')
        }
    })
})

module.exports = productRoute