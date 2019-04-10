//schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Unit = new Schema({
    unit_name: {
        type: String
    },
    unit_number: {
        type: Number
    }
})


module.exports = mongoose.model('Unit', Unit)