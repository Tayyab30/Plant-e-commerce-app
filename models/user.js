const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const userSchema = Schema({
    username : { 
        type : String , 
        required : true 
    },
    password : { 
        type : String , 
        required : true 
    },
    email : { 
        type : String , 
        required : true 
    }
}, { timestamp : true });

const User = mongoose.model('user' , userSchema , 'user');
module.exports = User ;