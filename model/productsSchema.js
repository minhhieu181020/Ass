let mongoose=require('mongoose');
const productsSchema=mongoose.Schema({
    name:{type:"string"},
    type:{type:"string"},
    count:{type:"Number"},
    price:{type:"Number"},

});
module.exports=productsSchema;