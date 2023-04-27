const mongoose=require('mongoose')
const Schema=mongoose.Schema
const validator= require('validator')
const userSchema=new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    pass:{
        type:String,
        require:true
    }
})

userSchema.statics.signup=async function(email,pass){
    if(!email&&!pass){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email))
    {
            throw Error('email is not valid')
    }
    
    const exists=await this.findOne({email})
    if(exists)
    {
        throw  Error('email exists')
    }
    const user=await this.create({email,pass})
  
    return user
}

userSchema.statics.login=async function(email,pass){
    if (!email || !pass) {
        throw Error('All fields must be filled')
      }
    
      const user = await this.findOne({ email })
    if(!user){
        throw Error('Invalid Credentials')
    }
    if(pass!==user.pass)
    {
        throw Error('Invalid Credentials')
    }
    return user
}
module.exports=mongoose.model('User',userSchema)