const express = require("express")
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt");
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()
userRouter.post("/register",async(req,res)=>{
    const {name,email,pass} = req.body;
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            }
            else{
                const user = new UserModel({name,email,pass:hash})
                await user.save()
            }
        })
        res.json({msg:"user has been registered",user:req.body})
    } catch (error) {
        res.json({error:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    var token = jwt.sign({userID:user._id,user:user.name},process.env.secret)
                    res.json({msg:"Login sucessfull",token})
                }
                else{
                    res.json({msg:"wrong creadentials"})
                }
            })
        }
        else{
            res.json({msg:"user does not exist"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
})



module.exports = {
    userRouter
}