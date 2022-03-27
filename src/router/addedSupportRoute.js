const express = require('express');
const authen = require('../middleware/authenFunction')
const feedback = require('../model/addedSupport')
const router = express.Router();

router.post('/feedback', authen, async (req, res) => {
    try {
        const feedbackData = new feedback(req.body);
        await feedbackData.save();
        res.status(201).send({ status: "Success", info: feedbackData });
    } catch (e) {
        res.status(400).send({ status: "Unsuccess", info: e.message });
    }
})

module.exports = router;