//schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Product = new Schema({
    name: {
        type: String
    },
    unit: {
        type: String
    },
    store: {
        type: Array
    }
})

/*
product: [{
        product_name: {
            type: String
        },
        product_detail: 
        [{
            product_item_name: {
                type: String
            },
            product_item_quantity: {
                type: String
            },
            product_item_unit: {
                type: String
            },
        }],
    }]
*/
module.exports = mongoose.model('Product', Product)
