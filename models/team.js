const mongoose=require('mongoose')
const Schema=mongoose.Schema
const teamS=new Schema({
    teamn:{
        type:String,
        required:true
    },
    teama:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model('teamw',teamS)