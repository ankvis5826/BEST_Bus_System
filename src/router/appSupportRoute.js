const express = require('express');
const authen = require('../middleware/authenFunction')
const busInfo = require('../model/busInfo')
const router = express.Router();


router.post('/support/addBusInfo', authen,async (req, res) => {
    try{        
        const busData =  new busInfo(req.body);
        await busData.save();
        res.status(201).send({status:"Success",info:busData});
    }catch(e){
        res.status(400).send({status:"Unsuccess",info:e.message});
    }
})

router.post('/support/getBusInfo', authen,async (req, res) => {
    try{        
        const allbuses = await busInfo.find({});
        res.status(201).send({status:"Success",info:allbuses});
    }catch(e){
        res.status(400).send({status:"Unsuccess",info:e.message});
    }
})

module.exports = router;