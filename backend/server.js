const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 4000
const cors = require('cors')
const stockRoute = require('./route/stock.route')
const unitRoute = require('./route/unit.route')
const logRoute = require('./route/log.route')
const productRoute = require('./route/product.route')
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/shop', { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

app.use('/stock', stockRoute)
app.use('/unit', unitRoute)
app.use('/log', logRoute)
app.use('/product', productRoute)

app.listen(PORT, () => {
    console.log('Server is Running on Port: ', PORT)
})