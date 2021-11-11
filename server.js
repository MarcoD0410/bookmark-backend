////////////////////////////
// Dependencies
////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose') // This can be changed to './database/connection' if you make a connection.js file
const cors = require('cors')
const { application } = require('express')
const app = express()
const {PORT = 3000} = process.env

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})