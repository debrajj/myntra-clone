const express=require("express")
const {userMOdel} = require("../model/usermodel")
const {productsdetails}=require("../model/note.module")
const uroute=express.Router()
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');


uroute.get("/",(req,res)=>{
    let data=productsdetails.find()
    res.status(200).send(data)
})


uroute.post("/register",async(req,res)=>{
    let {name,mob,email,password}=req.body
    try {
        bcrypt.hash(password, 2, async(err, hash)=> {

            let data=new userMOdel({name,mob,email,password:hash})
            await data.save()
            console.log(data)
            res.status(200).send({"msg":"user added"})
        });

        

        
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":error})
        
    }
})



uroute.post("/login",async(req,res)=>{
    try {
        const payload=req.body
        const user=await userMOdel.findOne({email:payload.email})
        if(!user)  return res.send({"msg":"please signup first"})
           const psswordcorrect=await bcrypt.compareSync(payload.password,user.password)
           if(psswordcorrect){
            const token=await jwt.sign({email:user.email,userid:user._id},"masai",{expiresIn:"1hr"})
            res.status(200).json({msg:"Login success",token,user})
           }
        else{
            res.status(400).json({msg:"invalid credentials"})
        }

}
     catch (error) {
        console.log(error)
    }
})


uroute.get("/user",async (req,res)=>{
    
    try {
        let token=req.headers.auth
        jwt.verify(token, 'masai', async (err, decoded)=> {
            if(decoded){
                let data=await userMOdel.find()
                res.status(200).send({"user":data})
            }else{
                res.status(400).send({"err":"error"})
            }
            
        });
        
        
    } catch (error) {
        res.status(500).send({"err":error})
        
    }


})



module.exports={
    uroute
}

