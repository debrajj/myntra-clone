const mongoose=require("mongoose")


const noteSchema=mongoose.Schema({
    name: String,
    sku: Number,
    mpn: String,
    price: Number,
    in_stock: Boolean,
    currency: String,
    brand: String,
    description: String,
    images: String,
    gender: String,
    rating: Number,
    size: String

})



const noteMOdel=mongoose.model("products",noteSchema)

module.exports={noteMOdel}