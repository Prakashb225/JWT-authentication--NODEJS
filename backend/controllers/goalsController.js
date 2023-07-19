const asynchandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User =require('../models/userModel');

const getgoals = asynchandler(async(req,res)=>{
    const goals = await Goal.find({user:req.user.id})
    res.status(200).json(goals);
});

const postgoals = asynchandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400);
        throw new Error('pls enter text');
    }
    const goal = await Goal.create({
        text:req.body.text,
        user: req.user.id,
    });
    res.status(200).json(goal);
});


const putgoals = asynchandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error("Goal not found");

    }

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('Not authorized');
    }


    const updatedgoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
    });

    res.status(200).json(updatedgoal);
});

const deletegoals = asynchandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error("Goal not found");

    }

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User not found");
    }

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('Not authorized');
    }

    await goal.deleteOne()

    res.status(200).json({id:req.params.id});
});


module.exports = {
    getgoals,
    postgoals,
    putgoals,
    deletegoals
}