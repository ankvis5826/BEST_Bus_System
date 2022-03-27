const express = require('express');
const authen = require('../middleware/authenFunction');
const router = express.Router();

//for login page
router.get('/', authen, (req, res) => {
    if (req.cookies.driver === "true") {
        res.render('driverRide');
    } else {
        res.render('Home');
    }

})

//for signUP page
router.get('/signUP', (req, res) => {
    res.render('signUp');
})

//for homePage page
router.get('/login', (req, res) => {
        res.render('login', { status: "fail" });
})

//for NearestStop page
router.get('/NearestStop', authen, (req, res) => {
    if (req.cookies.driver === "true") {
        res.render('driverRide');
    } else {
        res.render('NearestStop');
    }

})

//for TrackBus page
router.get('/TrackBus', authen, (req, res) => {
    if (req.cookies.driver === "true") {
        res.render('driverRide');
    } else {
        res.render('TrackBus');
    }

})

//for Map page
router.get('/busRoute', authen, (req, res) => {
    if (req.cookies.driver === "true") {
        res.render('driverRide');
    } else {
        res.render('busRoute');
    }

})

router.get('/map', authen, (req, res) => {
    if (req.cookies.driver === "true") {
        res.render('driverRide');
    } else {
        res.render('Map');
    }

})

// router.get('/ride',authen,(req,res)=>{
//     res.render('driverRide');
// })
//for Driver Page

module.exports = router;