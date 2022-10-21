import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import connectDB from './db/connectdb.js'
import User from './model/User.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || '5000'
const DATABASE_URL = process.env.DATABASE_URL

connectDB(DATABASE_URL)

app.use(express.json())
app.use(cors())

//define route
app.post('/register', async (req, res)=>{
    let user = new User(req.body);
    let result = await user.save()
    result = result.toObject();
    delete result.password
    res.send(result)
})

//route for login
app.post("/login", async (req, res)=>{
    if(req.body.password && req.body.email){
        console.log(User)
        let user = await User.findOne(req.body).select("-password");
        console.log(user)   
        if(user){
            res.send(user)
        }else{
            res.send({result:"No User Found!"})
        }
    }else{
        res.send({result:"No email and password found!"})
    }
})


app.get("/", ((req, res)=>{
    res.send('app is working')
}))

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`)
})