const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length==3) {
    console.log('phonebook:')
    Entry.find({}).then(result => {
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length==5) {

    const entry = new Entry({
        name: process.argv[3],
        number: process.argv[4],
    })

    entry.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })

}

module.exports = mongoose.model('Entry', entrySchema)