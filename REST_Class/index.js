const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts =[
    {
        id: uuidv4(),
        username: "John",
        content : "Hello World in JavaScript",
    },
    {
        id: uuidv4(),
        username: "Jane",
        content : "Hi there i am using Node.js",
    },
    {
        id: uuidv4(),
        username: "Doe",
        content : "Hey i am a developer",
    },

];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    console.log(req.body);
    // res.send("It worked");
    let id = uuidv4();
    let { username, content } = req.body;
    posts.push({id, username, content });
    res.redirect("/posts");  
});


app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("seepost.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    console.log(id);
    let newContent = req.body.content;
    console.log(newContent);
    // res.send("It worked");
    let post = posts.find(p => p.id === id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});  