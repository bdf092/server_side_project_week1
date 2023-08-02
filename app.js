const express = require('express')
const cors = require('cors')
const logger = require('./logger')

const countries = require('./countries.json')
const players = require('./players.json')

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

app.get('/countries/random', (req, res) => {

    let randomCountries = []

    for (let i = 0; i < 4; i++) {
        const randIdx = Math.floor(Math.random() * countries.length)
        while (randomCountries.includes(countries[randIdx])) {
            randIdx = Math.floor(Math.random() * countries.length)
        }
        randomCountries.push(countries[randIdx])

    }
    res.send(randomCountries);
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

app.get('/players', (req, res) => {
    res.send(players)
})

app.post('/players', (req, res) => {

    const player = req.body
    players.push(player)
    res.status(201).send(player)
})

module.exports = app
