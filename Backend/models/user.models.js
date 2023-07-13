const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type: 'string',
        unique: true,
        required: true
    },
    password : {
        type : 'string',
        required : true
    }
})

const User = mongoose.model('User',userSchema)

module.exports = {User}