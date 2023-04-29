const mongoose=require('mongoose')
const Schema=mongoose.Schema
const stat=new Schema({
   
    name:{
        type:String,
        required:true
    },
   team:{
    type:String,
    required:true
   },
   ach:{
    type:String,
    required:true
   }
},{timestamps:true})
module.exports=mongoose.model('stat',stat)