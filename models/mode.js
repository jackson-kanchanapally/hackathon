const mongoose=require('mongoose')
const Schema=mongoose.Schema
const topS=new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
},{timestamps:true})
module.exports=mongoose.model('topw',topS)