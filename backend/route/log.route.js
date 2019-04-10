const express = require('express')
const logRoute = express.Router()

let Log = require('../models/log.model')

logRoute.route('/').get((req, res) => {
    Log.find((err, log) => {
        if(err) {
            console.log(err)
        } else {
            res.json(log)
        }
    })
})

logRoute.route('/addLog').post((req,res) => {
    let log = new Log(req.body)
    log.save().then(log => {
        res.status(200).json({'log': 'Log Add'})
    }).catch(err => {
        res.status(400).send('log fail')
    })
})

module.exports = logRoute