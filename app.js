const express = require('express')
const transactionRouter = require("./controllers/transactionsControllers")
// Create an instance of the express server
const app = express()
const cors = require("cors")


app.use(express.json())
app.use(cors())

app.use('/transaction', transactionRouter)

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Budget')

})










module.exports = app