//schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Log = new Schema({
    history_log: {
        type: String
    },
    history_item_name: {
        type: String
    },
    history_item_quantity: {
        type: String
    },
    history_item_unit: {
        type: String
    },
    history_log_status: {
        type: String
    },
    date: {
        type: String
    }
})


module.exports = mongoose.model('Log', Log)
