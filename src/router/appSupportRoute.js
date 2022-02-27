const express = require('express');
const authen = require('../middleware/authenFunction')
const busInfo = require('../model/busInfo')
const router = express.Router();


router.post('/support/addBusInfo', authen, async (req, res) => {
    try {
        const busData = new busInfo(req.body);
        await busData.save();
        res.status(201).send({ status: "Success", info: busData });
    } catch (e) {
        res.status(400).send({ status: "Unsuccess", info: e.message });
    }
})

router.get('/support/getBusInfo', authen, async (req, res) => {
    try {
        const allbuses = await busInfo.find({});
        res.status(201).send({ status: "Success", info: allbuses });
    } catch (e) {
        res.status(400).send({ status: "Unsuccess", info: e.message });
    }
})
router.get('/support/getBusInfoByNum', authen, async (req, res) => {
    try {
        const buses = await busInfo.find({ busNo: req.query.num });
        res.status(201).send({ status: "Success", info: buses });
    } catch (e) {
        res.status(400).send({ status: "Unsuccess", info: e.message });
    }
})

router.get('/support/getBusInfoByNumAndStartEnd', authen, async (req, res) => {
    try {
        const buses = await busInfo.find({ busNo: req.query.num, startStop: req.query.start, endStop: req.query.end });
        res.status(201).send({ status: "Success", info: buses });
    } catch (e) {
        res.status(400).send({ status: "Unsuccess", info: e.message });
    }
})

router.get('/support/addmapInfo', authen, async (req, res) => {
    try {
        res.cookie("num", req.query.busNo);
        res.cookie("start", req.query.startstop);
        res.cookie("end", req.query.endstop);
        if (req.query.totrack === 'true') {
            res.cookie("isTrack", req.query.totrack);
        } else {
            res.cookie("isTrack", req.query.totrack);
        }
        res.redirect("/map");

    } catch (e) {
        res.status(400).send({ status: "Unsuccess", info: e.message });
    }
})
module.exports = router;