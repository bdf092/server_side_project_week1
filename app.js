const express = require('express')
const logger = require('./logger')

const countries = require('./countries.json')

const app = express()
app.use(logger)


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  
app.get('/countries', (req, res) => {
    res.send(countries)
  }) 

app.get('/countries/:id', (req, res) => {
    console.log(req.params)
    const idx = req.params.id
    
    const country = countries[idx -1]
    if(!country){
        res.status(404).json({message: 'Country with id ${idx} not found'})
    } else {
        res.send(country)
    }


   
  }) 

module.exports = app
