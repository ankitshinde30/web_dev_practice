const express=require("express");
const app=express();

let port = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.get("/register",(req,res)=>{
    let {name, email, password} = req.query;
    res.send(`hey ${name}, your email is ${email} and password is ${password}`);
    console.log("GET request received");
});

app.post("/register",(req,res)=>{
    let {name, email, password} = req.body;
    res.send(`hey ${name}, your email is ${email} and password is ${password}`);
    console.log("POST request received");
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}); 