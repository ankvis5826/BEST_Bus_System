const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    fullName:{
        type:String,
        trim:true 
    }, 
    emailPhone:{
        type:String,
        trim:true 
    },
    message:{
        type:String,
        trim:true,
        required:true
    }
})

const feedback = mongoose.model('feedback',feedbackSchema);
module.exports = feedback;