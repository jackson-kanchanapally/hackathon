const mongoose=require('mongoose')
const Schema=mongoose.Schema
const teamM=new Schema({
    pln:{
        type:String,
        required:true
    },
    team:{
        type:String,
        required:true
    },
    roll:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model('teamM',teamM)