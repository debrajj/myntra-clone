const express=require("express")
const {uroute}=require("./routes/routes")
const {connection}=require("./db")
const {productsdetails}=require("./model/note.module")
const {noteroute}=require("./routes/notes.route")
const {auth}=require("./moddleware/noteverify")
const cors=require("cors")


const app=express()
app.use(cors())
app.use(express.json())
// noteroute.get("/product",async(req,res)=>{
//     try {
//         let data=productsdetails.find()
//         res.status(200).send(data)
        
//     } catch (error) {
        
//     }
    

// })

app.use("/home",uroute)

// app.use(auth)

app.use("/note",noteroute)







app.listen(9864,async()=>{
    try {
        await connection
        console.log({"msg":"db is running"})
        
        
    } catch (error) {
        console.log({"msg":error})
        
    }
    console.log("server is running ON 9864")
   
})