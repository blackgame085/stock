//schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Log = new Schema({
    history_log: {
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
