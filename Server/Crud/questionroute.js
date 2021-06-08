const express=require('express');
const router=express.Router();
const ObjectId=require('mongoose').Types.ObjectId;
//getting the models
const {Question}=require('../Models/question');
//CRUD for Questions
//getting the questions
router.get('/',(req,res)=>{
    Question.find((err,docs)=>{
        if(err){
            res.status(500).send({errorMessage:"Questions cannot be retrived"})
        }
        res.send(docs)
    })
})
//getting the particular question using id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    Question.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage:"Question cannot be fetched"})
        }
        res.send(docs)
    })
})
//creating a new question
router.post('/',(req,res)=>{
    const newQuestion=new Question(req.body)
    newQuestion.save((err,docs)=>{
        if(err){
            if(err.name==="ValidationError"){
                res.status(400).send({ errorMessage: "question,number needed in the body" })
            }
            else{
               res.status(500).send({errorMessage: "Question could not be posted." })
            }
        }
        res.send(docs);
    })
})
//updating a question
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    const updatedQuestion=req.body
    Question.findByIdAndUpdate(req.params.id,{$set:updatedQuestion},{new:true},(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage: "Question could not be updated." })
        }
        res.send(docs)
    })
})
//removing a question
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    Question.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage: "Question could not be deleted." })
        }
        res.send(docs)
    })
})

module.exports=router;