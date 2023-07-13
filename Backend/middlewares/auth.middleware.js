const jwt=require("jsonwebtoken")
const auth = (req,res,next) => {
    let token=req.headers.authorization.split(" ")[1];
    if(token){
        let decoded = jwt.verify(token, 'masai');
        if(decoded.UserID){
            next()
        }else{
            res.status(201).send({msg:"Plese Login"});
        }
    }else{
        res.status(201).send({msg:"Plese Login"});
    }
}


module.exports={auth}