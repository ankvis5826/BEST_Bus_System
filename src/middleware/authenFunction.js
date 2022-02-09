const jwt = require('jsonwebtoken');
const Users = require('../model/registration')

const authen = async function (req, res, next) {
    try { 

        console.log('authen1')
        let token;
        if(!req.cookies.token){
            console.log('authen2')
            token = req.header('Authorization').replace('Bearer ','');   
        }else{
            console.log('authen3')
             token =req.cookies.token;
        }
        const decodedtoken = jwt.verify(token, '@BESTProject@')
        const user =  await Users.findOne( {_id: decodedtoken._id, 'tokens.token':token})
        if(!user){
            throw new Error({
                Error:"Authorization First"
            })
        }
        req.user = user  
        next()
    } catch (e) {
        res.status(404).send({ Error: `${e} Authorization First` })
    }
}

module.exports = authen;