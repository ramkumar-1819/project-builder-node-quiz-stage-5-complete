const express=require('express');
const router=express.Router();
const ObjectId=require('mongoose').Types.ObjectId;
//getting the models
const {Answer}=require('../Models/answer');
//CRUD for answers
//getting the answers
router.get('/',(req,res)=>{
    Answer.find((err,docs)=>{
        if(err){
            res.status(500).send({errorMessage:"Answers cannot be retrived"})
        }
        res.send(docs)
    })
})
//getting the particular answer using id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    Answer.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage:"Answer cannot be fetched"})
        }
        res.send(docs)
    })
})
//creating a new answer
router.post('/',(req,res)=>{
    const newAnswer=new Answer(req.body)
    newAnswer.save((err,docs)=>{
        if(err){
            if(err.name==="ValidationError"){
                res.status(400).send({ errorMessage: "Answer needed in the body" })
            }
            else{
               res.status(500).send({errorMessage: "Answer could not be posted." })
            }
        }
        res.send(docs);
    })
})
//updating a answer
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    const updatedAnswer=req.body
    Answer.findByIdAndUpdate(req.params.id,{$set:updatedAnswer},{new:true},(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage: "Answer could not be updated." })
        }
        res.send(docs)
    })
})
//removing a answer
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    Answer.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage: "Answer could not be deleted." })
        }
        res.send(docs)
    })
})

module.exports=router;