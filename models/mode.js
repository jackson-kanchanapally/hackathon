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
    fathname:{
        type:String,
        required:true
    },
    mothname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenum:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model('topw',topS)