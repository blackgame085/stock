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

productRoute.route('/editProduct/:id').get((req,res) => {
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
            product.name = req.body.name
            product.unit = req.body.unit
            product.store = req.body.store

            product.save().then(product => {
                res.json('Update success')
            }).catch(err => {
                res.status(400).send('Update fail')
            })
        }
    })
})
/*
productRoute.route('/delete/delItem/:id').get((req,res) => {
    Product.findByIdAndRemove( {'store.storeId': req.params.id}, (err, product) => {
        if(err) {
            res.json(err)
        } else {
            res.json(product)
        }
    })

})
*/

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