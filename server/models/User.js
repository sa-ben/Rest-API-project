const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required : true
    },
    email:{
        type:String,
        lowercase: true,
        required: true
    },
    address: String,
    phone:{
        type: String,
        trim: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)