const { faker, fi } = require('@faker-js/faker');
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Shinde@123',
});

let q= "INSERT INTO users(id,username,email,password) VALUES(?,?,?,?)";
let user = ["123","123_newuser","abc@yahoo.co.in","123456"];


try{
    connection.query(q,user, (err, results) => {
        if (err) throw err;
        console.log("Tables in the database:", results);
    });
}catch(err){
    console.error("Error fetching tables:", err);
}
finally{
    connection.end();
}

let getRandomUser=() =>{
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),  };
}

// console.log(getRandomUser());