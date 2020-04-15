const mongoose = require('mongoose')
mongoose.connect('mongodb://db/', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection
db.on('error', err => console.error('connection error', err))
db.once('open', () => console.log('Connected to MongoDB'))

let AccountSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    pet: String
})

module.exports = {
    Account: mongoose.model('AccountSchema', AccountSchema)
}