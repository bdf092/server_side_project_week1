const express = require('express')
const cors = require('cors')
const logger = require('./logger')

const countries = require('./countries.json')

const app = express()

//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(logger)


app.get('/', (req, res) => {
    res.send('Hello Countries Game!')
})


app.get('/countries', (req, res) => {
    res.send(countries)
})



app.get('/countries/:id', (req, res) => {
    console.log(req.params)
    const idx = req.params.id

    const country = countries[idx - 1]
    if (!country) {
        res.status(404).json({ message: `Country with id ${idx} not found` })
    } else {
        res.send(country)
    }
})


app.post('/countries', (req, res) => {

    const country = req.body
    countries.push(country)
    res.status(201).send(country)
})

module.exports = app
