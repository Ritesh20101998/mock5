const mongoose=require("mongoose");

const dashboardSchema=mongoose.Schema({
    Name:{
        type: String,
        required : true,
    },
    Email:{
        type : String,
        required : true,
    },
    Department:{
        type : String,
        required : true,
    },
    Salary:{
        type : Number,
        required : true,
    }
});

const dashboardModel=mongoose.model("employee",dashboardSchema);


module.exports={dashboardModel}