const express = require('express');
const async = require('hbs/lib/async');
const authen = require('../middleware/authenFunction')
const liveBus = require('../model/liveBus')
const router = express.Router();


router.post('/update/liveBus', authen, async (req, res) => {
    try {
     const liveBusData  = new liveBus(req.body);
     await liveBusData.save();
     res.status(201).send({status:"Success",info:liveBusData});

    } catch (e) {
     res.status(400).send({status:"Unsuccess",info:e.message});
    }
})

router.get('/update/getLiveBus',authen,async (req,res)=>{
     try{
        const liveBusses = await liveBus.find({busNo:req.query.busNo,startStop:req.query.start})
        res.status(201).send({status:"Success",info:liveBusses});
     }catch(e){
     res.status(400).send({status:"Unsuccess",info:e.message});
      
     }
})
module.exports = router;