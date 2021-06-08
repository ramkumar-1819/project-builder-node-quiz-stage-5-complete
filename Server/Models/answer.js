const mongoose=require('mongoose'),Schema=mongoose.Schema;
//schema for answers
const answerSchema=new Schema({
    answer:{type:String,required:true}
})
//Creating a model for answer
const Answer=mongoose.model("Answer",answerSchema);
module.exports={Answer};
