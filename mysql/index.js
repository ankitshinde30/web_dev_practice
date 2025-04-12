const { faker, fi } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

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
let getRandomUser=() =>{
    return [
      faker.string.uuid(),
      faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password()
    ];
  }


app.get("/",(req,res)=>{
  let q = "select count(*)from users";
  try{
        connection.query(q, (err, results) => {
            if (err) throw err;
            let count = results[0]['count(*)'];
            console.log("Total no of count:", results);
            res.render("home.ejs",{count});
        });
    }catch(err){
        console.error("Error fetching count:", err);
        res.send("Error fetching count:", err);
    }
    finally{
        connection.end();
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