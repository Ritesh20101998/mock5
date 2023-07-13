const express=require("express");
const  dashboardModel  = require("../models/dashboard.models")
const dashboardRouter = express.Router();



dashboardRouter.post("/employees",async(req,res)=>{
    const { FirstName,LastName,Email,Department,Salary}=req.body;
    try {
        let employee=await new dashboardModel({Name:`${FirstName} ${LastName}`,Email,Department,Salary});
        employee.save();
        res.status(201).send({msg:"employee data saved !"})
    } catch (error) {
        res.status(201).send({msg:"some error occured!"});
        console.log(error)
    }
})

dashboardRouter.delete("/delete/:id",async(req,res)=>{
      const {id}=req.params;
      try {
        await dashboardModel.findByIdAndDelete({_id:id});
        res.status(201).send({msg:"employee deleted!"})
      } catch (error) {
        console.log(error.message)
        res.status(400).send({msg:"some error occured!"})
      }
});

dashboardRouter.get("/show",async(req,res)=>{
    const {page}=req.query;
    let pageNo=page||1;
    try {
        let data=await dashboardModel.find().skip(5*(pageNo-1)).limit(5);
    res.status(201).send({msg:data})
    } catch (error) {
        res.status(400).send({msg:"some error occurred !"})
    }
    
})
dashboardRouter.get("/filter",async(req,res)=>{
    const {Department}=req.query;
    let pageNo=page||1;
    try {
        let data=await dashboardModel.find({Department}).skip(5*(pageNo-1)).limit(5);
    res.status(201).send({msg:data})
    } catch (error) {
        res.status(400).send({msg:"some error occurred !"})
    }
    
})
dashboardRouter.get("/sort",async(req,res)=>{
   // const {salary}=req.query;
    let pageNo=page||1;
    try {
        let data=await dashboardModel.find().sort({Salary:1}).skip(5*(pageNo-1)).limit(5);
    res.status(201).send({msg:data})
    } catch (error) {
        res.status(400).send({msg:"some error occurred !"})
    }
    
})

module.exports={dashboardRouter}