const express=require("express")
const noteroute=express.Router()
const {productsdetails}=require("../model/note.module")
const {noteMOdel}=require("../model/note.module")
const jwt=require("jsonwebtoken")

noteroute.post("/add",async (req,res)=>{
    try {
        console.log(req.body)
        let data=new noteMOdel(req.body)
        await data.save()
        res.status(200).send({"msg":"note added SUCCESSFULLY !!!!!!"})        
    } catch (error) {
        res.status(400).send({"error":error})
        
    }
})


noteroute.get("/show",async(req,res)=>{
    // const token=req.header.authorization
    // const decoded=jwt.verify(token,process.env.secrete_key)

    try {
        let data=await noteMOdel.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    noteroute
}
