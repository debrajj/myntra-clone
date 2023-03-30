const mongoose=require("mongoose")


const noteSchema=mongoose.Schema({
    title:String,
    heading:String,
    description:String,
    userid:String

})



const noteMOdel=mongoose.model("notes",noteSchema)

module.exports={noteMOdel}