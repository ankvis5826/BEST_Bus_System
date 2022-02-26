const mongoose = require('mongoose')

const busInfoSChema = new mongoose.Schema({
    busNo:{
        type:String,
        required:true,
        trim:true
    },
    isAC:{
        type:String,
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
            type:Object,
    }],
    startStop:{
        type:String
    },
    endStop:{
        type:String
    },
    busType:{
        type:String
    }
})

const busInfo = mongoose.model('busInfo',busInfoSChema)

module.exports = busInfo;