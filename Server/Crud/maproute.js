const express=require('express');
const router=express.Router();
const ObjectId=require('mongoose').Types.ObjectId;
//exporting the required models
const {Answer}=require('../Models/answer');
const {Options}=require('../Models/option');
const {Question}=require('../Models/question');
//mapping the answers and options into questions
router.post('/answer/:id/:number',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid id"})
    }
    let newanswer,newquestion;
    Answer.findById(req.params.id,(err,docs)=>{
        if(err){
            req.status(500).send({error:"Something went wrong"})
        }
        newanswer=new Answer(docs)
    })
    Question.findOne({number:req.params.number},(err,docs)=>{
        if(err){
            req.status(500).send({error:"Something went wrong"})
        }
        newquestion=new Question(docs)
        newquestion.answer.push(newanswer);
        newquestion.save((err,docs)=>{
            if(err){
                req.status(500).send({error:"Something went wrong"})
            }
            res.send(docs)
        })
    })
})

router.post('/option/:id/:number',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid id"})
    }
    let newoption,newquestion;
    Options.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Something went wrong"})
        }
        newoption=new Options(docs)
    })
    Question.findOne({number:req.params.number},(err,docs)=>{
        if(err){
            res.status(500).send({error:"Something went wrong"})
        }
        newquestion=new Question(docs)
        newquestion.option.push(newoption);
        newquestion.save((err,docs)=>{
            if(err){
                res.status(500).send({error:"Something went wrong"})
            }
            res.send(docs)
        })
    })
})
//view everything 
router.get('/view',(req,res)=>{
    Question.find({}).populate(['answer','option']).exec((err,docs)=>{
        if(err){
            res.status(500).send({error:"Something went wrong"})
        }
        res.send(docs)
    })
})
module.exports=router;