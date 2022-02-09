const express = require('express');
const authen = require('../middleware/authenFunction');
const router = express.Router();

//for login page
router.get('',(req,res)=>{
    res.render('login');
})

//for signUP page
router.get('/signUP',(req,res)=>{
    res.render('signUP');
})

//for homePage page
router.get('/homePage',authen,(req,res)=>{
    res.render('Home');
})

//for NearestStop page
router.get('/NearestStop', authen,(req,res)=>{
    res.render('NearestStop');
})

//for TrackBus page
router.get('/TrackBus',authen,(req,res)=>{
    res.render('TrackBus');
})

//for Map page
router.get('/Map',authen,(req,res)=>{
    res.render('Map');
})

module.exports = router;