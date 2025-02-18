const express=require("express");
const app=express();

let port = 8080;



app.get("/register",(req,res)=>{
    let {name, email, password} = req.query;
    res.send(`hey ${name}, your email is ${email} and password is ${password}`);
    console.log("GET request received");
});

app.post("/register",(req,res)=>{
    res.send('standard POST request');
    console.log("POST request received");
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}); 