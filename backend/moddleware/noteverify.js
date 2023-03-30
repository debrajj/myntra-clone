const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.auth
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            console.log(decoded)
            req.body.userid=decoded.userid
            next()
        }else{
            res.send("please login first")
        }
    }else{
        res.send("please login first")
    }
}

module.exports={
    auth
}