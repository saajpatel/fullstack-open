const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const Entry = require('./models/entry')
const cors = require('cors')

app.use(cors())


let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    console.log(req.body)
    morgan.token('person', function (req, res) { return JSON.stringify({ name: req.body.name, number: req.body.number })})

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.person(req, res)
    ].join(' ')
  }))
app.use(express.static('dist'))

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.get('/api/persons', (request, response) => {
    Entry.find({}).then(entries => {
        console.log(entries)
        response.json(entries)
    })
})

app.get('/info', (request, response) => {

    const amount = persons.length
    const date = new Date().toString()

    response.send(`
        <p> Phonebook has info for ${amount} people </p>
        <p> ${date} </p>
        `)
})

app.get('/api/persons/:id', (request, response) => {

    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {

    Entry.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response) => {

    const body = request.body //change to database

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Entry({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response, next) => {

    const body = request.body
    
    const note = {
        name: body.name,
        number: body.number,
    }

    Entry.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedEntry => {
            response.json(updatedEntry)
        })
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})