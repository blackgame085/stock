//schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Stock = new Schema({
    item_name: {
        type: String
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    warning: {
        type: Number
    },
    history_item_name: {
        type: String
    },
    history_quantity: {
        type: Number
    },
    history_unit: {
        type: String
    },
    history_warning: {
        type: Number
    }
})


module.exports = mongoose.model('Stock', Stock)
