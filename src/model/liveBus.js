const mongoose = require('mongoose')

const liveBusSchema = new mongoose.Schema({
    dId:{
        type:String,
        trim:true
    },
    busNo:{
        type:String,
        required:true,
        trim:true
    },
    startStop:{
        type:String
    },
    vehicleNo:{
        type:String,
        required:true,
        unique : true,
        trim:true
    },
    liveLoc:{
        type:Object,
        required:true
    }
})

const liveBus = mongoose.model('liveBus',liveBusSchema)

module.exports = liveBus;