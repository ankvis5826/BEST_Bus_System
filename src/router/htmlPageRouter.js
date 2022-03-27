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

//for route page
router.get('/busRoute', authen, (req, res) => {
    if (req.cookies.driver === "true") {
        res.render('driverRide');
    } else {
        res.render('busRoute');
    }

})

//for Map page
router.get('/map', authen, (req, res) => {
    if (req.cookies.driver === "true") {
        res.render('driverRide');
    } else {
        res.render('Map');
    }

})

//for feedback  page
router.get('/feedback', authen, (req, res) => {
    if (req.cookies.driver === "true") {
        res.render('driverRide');
    } else {
        res.render('feedback');
    }

})





module.exports = router;