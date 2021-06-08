const mongoose=require('mongoose'),Schema=mongoose.Schema;
//Defining the Schema for questions
const questionSchema=new Schema({
    question:{type:String,required:true},
    option:[{type:Schema.Types.ObjectId,ref:"Option"}],
    answer:[{type:Schema.Types.ObjectId,ref:"Answer"}],
    number:{type:Number,required:true}
})
//Creating a model for question
const Question=mongoose.model("Question",questionSchema);
module.exports={Question}

