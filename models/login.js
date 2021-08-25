const mongoose = require('mongoose')

const Schema = mongoose.Schema

const loginData = new Schema ({
    username:String,
    passwords:String
})

module.exports = mongoose.model('login',loginData)