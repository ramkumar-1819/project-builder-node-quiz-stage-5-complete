const express=require('express');
const router=express.Router();
const ObjectId=require('mongoose').Types.ObjectId;
//getting the models
const {Options}=require('../Models/option');
//CRUD for options
//getting the options
router.get('/',(req,res)=>{
    Options.find((err,docs)=>{
        if(err){
            res.status(500).send({errorMessage:"Options cannot be retrived"})
        }
        res.send(docs)
    })
})
//getting the particular option using id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    Options.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage:"Option cannot be fetched"})
        }
        res.send(docs)
    })
})
//creating a new option
router.post('/',(req,res)=>{
    const newOption=new Options(req.body)
    newOption.save((err,docs)=>{
        if(err){
            if(err.name==="ValidationError"){
                res.status(400).send({ errorMessage: "Option needed in the body" })
            }
            else{
               res.status(500).send({errorMessage: "Option could not be posted." })
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
    const updatedOption=req.body;
    Options.findByIdAndUpdate(req.params.id,{$set:updatedOption},{new:true},(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage: "Option could not be updated." })
        }
        res.send(docs)
    })
})
//removing a question
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    Options.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({errorMessage: "Option could not be deleted." })
        }
        res.send(docs)
    })
})
module.exports=router;