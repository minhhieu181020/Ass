let mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{type:"string"},
    password:{type:"string"},
});
module.exports=userSchema;