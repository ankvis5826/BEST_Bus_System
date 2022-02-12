const mongoose = require('mongoose')

const busInfoSChema = new mongoose.Schema({
    busNo:{
        type:String,
        required:true,
        trim:true
    },
    isAC:{
        type:Boolean,
        required:true
    },
    maxPrice:{
        type:Number,
        required:true
    },
    stops:[{
        type:String,
        required:true
    }],
    stopGeoLoc:[{
            type:String
    }]
})

const busInfo = mongoose.model('busInfo',busInfoSChema)

module.exports = busInfo;