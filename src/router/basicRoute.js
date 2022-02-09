const express = require('express');
const authen = require('../middleware/authenFunction')
const Users = require('../model/registration')
const router = express.Router();



router.post('/signup', async (req, res) => {

    const user = new Users(req.body);
    try {
        await user.save();
        res.status(201).send(user.sendDataChack())

    } catch (e) {
        res.status(400).send(`Error ${e}`);
    }
})
// router.post('/test',  (req, res) => {

// })

router.post('/user/login', async (req, res) => {
   
    try {
        const user = await Users.findByLoginInfo(req.body.email, req.body.pass);
        const token = await user.AuthenToken();
        res.cookie('token',token);
        res.cookie('user',user);
        res.redirect('/homePage');
       // res.status(200).send({user: user.sendDataChack(),token});
    } catch (e) {
        res.status(400).send('error: '+e);
    }
})

router.get('/me', authen, async (req, res) => {
     res.status(201).send(req.user.sendDataChack());
})





router.patch('/user/update', authen, async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdate = ['fullName', 'email', 'pass'];
    const isvalid = update.every((updateKeys) => allowedUpdate.includes(updateKeys));

    if (!isvalid) {
        return res.status(400).send('error : invaild update')
    }

    try {
        const user = req.user;

        update.forEach((updateKeys) => user[updateKeys] = req.body[updateKeys])

        await user.save()

        if (!user) {
            return res.status(400).send("error :invalid user")
        }
        res.status(201).send(user.sendDataChack());
    } catch (e) {
          res.status(404).send({Error:e})
    }
})

router.post('/user/logout', authen, async(req,res)=>{
    try{

        const user = req.user;
        const token = req.header('Authorization').replace('Bearer ','');
        const updatetoken = user.tokens.filter((tokenArray)=>{
               return tokenArray.token != token;
        })
        user.tokens = updatetoken;
        user.save();
        res.status(201).send('Done');
    }catch(e){
        res.status(505).send({Error:"Authen first"})
    }
     
});

//this is for the page
router.get('/Home', authen ,(req,res)=>{
    res.status(201).send("home Page")
})

router.get('/GetBus', authen ,(req,res)=>{
    res.status(201).send("home Page")
})

router.get('/Track', authen ,(req,res)=>{
    res.status(201).send("home Page")
})

router.get('/Route', authen ,(req,res)=>{
    res.status(201).send("home Page")
})

module.exports = router;