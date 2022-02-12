const jwt = require('jsonwebtoken');
const Users = require('../model/registration')

const authen = async function (req, res, next) {
    try { 
        let token;
        if(!req.cookies.token){
            token = req.header('Authorization').replace('Bearer ','');   
        }else{
             token =req.cookies.token;
        }
        const decodedtoken = jwt.verify(token, '@BESTProject@')
        const user =  await Users.findOne( {_id: decodedtoken._id, 'tokens.token':token})
        if(!user){
            throw new Error({status:"fail",message:"User not not there"})
        }
        req.user = user  
        next()
    } catch (e) {
        res.status(201).render('login')
    }
}

module.exports = authen;