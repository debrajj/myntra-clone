const express=require("express")
const noteroute=express.Router()
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
    const token=req.headers.auth;
    const decoded=jwt.verify(token,"masai")
    try {
        if(decoded){
            let data=await noteMOdel.find({"userid":decoded.userid})
            res.status(200).send({"data":data})

        }else{
            res.status(400).send({"msg":err.massage})
        }
               
        
    } catch (error) {
        res.status(400).send({"error":error})
        
    }
    
})








noteroute.patch("/edit/:id",async(req,res)=>{
    try {
        let {id}=req.params
        let payload=req.body
        let data=await noteMOdel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({"msg":"note upodated"})
                
    } catch (error) {
        res.status(400).send({"error":error})
        console.log(error)
        
    }
})

noteroute.delete("/delete/:id",async(req,res)=>{
    try {
        let {id}=req.params
        
        let data=await noteMOdel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"note deleted"})
    } catch (error) {
        res.status(400).send({"error":error})
        console.log(error)
        
    }
})





module.exports={
    noteroute
}
