const mongoose=require('mongoose')
const Schema=mongoose.Schema
const points=new Schema({
   
    team:{
        type:String,
        required:true
    },
    points:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model('poin',points)