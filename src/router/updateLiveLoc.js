const express = require('express');
const async = require('hbs/lib/async');
const authen = require('../middleware/authenFunction')
const liveBus = require('../model/liveBus')
const router = express.Router();


router.post('/update/liveBus', authen, async (req, res) => {
    try {
        const liveBusData = new liveBus(req.body);
        await liveBusData.save();
        res.status(201).send({ status: "Success", info: liveBusData });

    } catch (e) {
        res.status(400).send({ status: "Unsuccess", info: e.message });
    }
})

router.get('/update/getLiveBus', authen, async (req, res) => {
    try {
        const liveBusses = await liveBus.find({ busNo: req.query.busNo, startStop: req.query.start })
        res.status(201).send({ status: "Success", info: liveBusses });
    } catch (e) {
        res.status(400).send({ status: "Unsuccess", info: e.message });

    }
})


router.post('/update/liveBus2', authen, async (req, res) => {
    try {
        let bus = await liveBus.find({ busNo: req.body.busNo, startStop: req.body.startStop, vehicleNo: req.body.vehicleNo });
        if (bus.length > 0) {
               bus[0].liveLoc = {
                   lat:req.body.liveLoc.lat,
                   lng:req.body.liveLoc.lng
                } 
                await bus[0].save()
        } else {
            const newBuses = new liveBus(req.body)
            await newBuses.save();
        }
        res.status(201).send({ status: "success" });

    } catch (e) {
        res.status(400).send({ status: "Unsuccess" });
    }
})


router.post('/update/deleteBus',async(req,res)=>{

    try{
       await liveBus.deleteOne(req.body);
       res.status(201).send({ status: "success" });
    }catch(e){
        res.status(400).send({ status: "Unsuccess" });
    }
})
module.exports = router;

//res.status(400).send({status:"Unsuccess",info:e.message});
