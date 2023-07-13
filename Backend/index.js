const express = require('express');
const app = express()
const connection =  require('./config/config')
const {userRouter} = require('./routes/user.routes');
const {dashboardRouter} = require('./routes/dashboard.routes');
const { auth } = require('./middlewares/auth.middleware');

require('dotenv').config()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) =>{
    res.send("Welcome to Employee Dashboard...")
})


app.use("/user",userRouter)
app.use(auth)
app.use("/dashboard",dashboardRouter)



app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log('server is running')
    }
    catch(err){
        console.log(err.message)
        console.log("Server is not running")
    }
    console.log(`Server is running on port ${process.env.port}`)
})