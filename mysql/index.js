const { faker, el } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
// Removed as 'uuidv4' is not used
const path = require('path');
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let port = 3000;

// Middleware to parse JSON bodies
app.set ('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Shinde@123',
});

// Create a random user using faker.js
// Removed as 'getRandomUser' is not used

//Home route
app.get("/", (req, res) => {
  let q = "select count(*) from users";
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      let count = results[0]['count(*)'];
      console.log("Total no of count:", results);
      res.send(`Total count: ${count}`);
    });
  } catch (err) {
    console.error("Error fetching count:", err);
    res.send(`Error fetching count: ${err.message}`);
  }
});

//show Route
app.get("/users", (req, res) => {
  let q = "select * from users";
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      // console.log("Users:", users);
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.send(`Error fetching users: ${err.message}`);
  }
});

//Edit Route 
app.get("/users/:id/edit", (req, res) => {
  let {id}= req.params;
  let q=`select * from users where id='${id}'`;
  try{
    connection.query(q, (err,result) => {
        if (err) throw err;
        console.log("Users:", result);
        let users = result[0];
        res.render("editpost.ejs", { users });
    });
  } catch (err) {
    console.error("Error fetching count:", err);
    res.send("Error fetching count:", err);
  }
});

//Update Route

app.patch("/users/:id", (req, res) => {
  let {id}= req.params;
  let {password:formpass,username:newusername} = req.body;
  let q=`select * from users where id='${id}'`;
  try{
    connection.query(q, (err,result) => {
        if (err) throw err;
        let users = result[0];
        if(formpass!= users.password){
            res.send("Password is not correct");
        }else{
            let q2=`update users set username='${newusername}' where id='${id}'`;
            connection.query(q2, (err,result) => {
                if (err) throw err;
                res.redirect("/users");
            });
        }
    });
  } catch (err) {
    console.error("Error fetching count:", err);
    res.send("Error fetching count:", err);
  }


});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 


// try{
//     connection.query(q,[user], (err, results) => {
//         if (err) throw err;
//         console.log("Tables in the database:", results);
//     });
// }catch(err){
//     console.error("Error fetching tables:", err);
// }
// finally{
//     connection.end();
// }


// console.log(getRandomUser());