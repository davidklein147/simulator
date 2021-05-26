const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    id:{
        type: String,
        unique: true
    },
    name:{
        type:String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String
    },
    roleNum:{
        type: Number
    },
    passport:{
        type:String
    },
    phoneNum:{
        type:String
    },
});

module.exports = mongoose.model('user',userSchema);