const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require("./models/user");


app.post("/signup", async (req, res)=>{
  // creating a new instance of the User modal
  const user = new User({
    firstName: "sanjai",
    lastName: "kumar",
    emailId: "sanjai@kumargmail.com",
    password: "sanjai@123"
  });
try{
  await user.save();
  res.send("User registered successfully");
}catch(err){
  res.status(500).send("error in store the user in database")
}
  
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });



