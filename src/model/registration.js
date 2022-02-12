const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName:{
          type:String,
          required:true,
          trim:true,
    },
    email:{
        type:String,
        required:true,
        unique : true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalid')
            }
        }
    },
    pass:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<8){
                throw new Error('Password is less then 8');
            }
        }
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})


userSchema.methods.sendDataChack =  function(){
    const user = this;
    const userCopy = user.toObject();
    delete userCopy.pass;
    delete userCopy.tokens;
    return userCopy;
}

userSchema.methods.AuthenToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, '@BESTProject@')
    user.tokens = user.tokens.concat( { token:token } )
    await user.save();
    return token;
}


userSchema.statics.findByLoginInfo = async function (email,pass){
    
    const user = await Users.findOne({email});
    if(!user){
        
        throw new Error({status:"fail",Message:"Wrong Email"})
    }  
    const isvalidPass =  await bcrypt.compare(pass,user.pass);   
    if(!isvalidPass){
         throw new Error({status:"fail",message:"Wrong Password"})
    }
    return user;
} 


userSchema.pre('save',async function(next){
     const user = this
     if(user.isModified('pass')){
        user.pass = await bcrypt.hash(user.pass,8)
     }
    next()
})


const Users = mongoose.model('Users',userSchema);

module.exports = Users;