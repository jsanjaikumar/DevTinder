const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require("./models/user");

app.use(express.json())

app.get("/user", async (req, res)=>{
  const userEmailId = req.body.emailId;
  
  try{
    const users = await User.findOne({ emailId: userEmailId })


    if (!users){
        res.status(404).send("User not found")
    }else{
        res.send(users)
    }}
    catch(err){
      res.status(500).send("Error in fetching user from database")
    }
})

app.get("/feed", async (req, res)=>{
  try { 
    const allUsers =  await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(500).send("Error in fetching user from database");
  }
})

app.post("/signup", async (req, res)=>{
  // creating a new instance of the User modal

  const user = new User(req.body);
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



