const mongoose=require('mongoose'),Schema=mongoose.Schema;
//schema for options
const optionSchema=new Schema({
    optionA:{type:String,required:true},
    optionB:{type:String,required:true},
    optionC:{type:String,required:true},
    optionD:{type:String,required:true},
})
//Creating a model for option
const Options=mongoose.model("Option",optionSchema);
module.exports={Options};