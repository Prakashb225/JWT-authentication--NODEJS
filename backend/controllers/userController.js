const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asynchandler = require ('express-async-handler');
const User = require('../models/userModel');

const registerUser = asynchandler(async(req,res)=>{
    const {name , email , password} = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userexists = await User.findOne({email});

    if(userexists){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        name,
        email,
        password:hashedpassword
    });

    if(user){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateJwt(user.id),
        })
    }else{
            res.status(400)
            throw new Error('Invalid user')
        }

});
const loginUser = asynchandler(async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateJwt(user.id),
            
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials');
    }
});
const getme = asynchandler(async(req,res)=>{
    const {_id,name,email}=await User.findById(req.user.id);

    res.status(200).json({
        id:_id,
        name,
        email,
    });
});

const generateJwt = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
};
module.exports = {
    registerUser,
    loginUser,
    getme
}