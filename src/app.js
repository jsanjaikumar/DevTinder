const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require("./models/user");

app.use(express.json())

//signUp API 
app.post("/signup", async (req, res) => {
  // creating a new instance of the User modal
  const user = new User(req.body);
  console.log(user)
  try {
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(500).send("error in store the user in database" + err.message);
  }
});


// get a user by emailId
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
// get all users - creating a feed API
app.get("/feed", async (req, res)=>{
  try { 
    const allUsers =  await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(500).send("Error in fetching user from database");
  }
})

// delete a user by userId
app.delete('/user',async (req,res)=>{
  const userId = req.body.userId;
  try{
    const deletedUser = await User.findByIdAndDelete(userId)
    if(!deletedUser){
      res.status(404).send("User not found")
    }else{
        res.send("User deleted successfully")
      }
  }catch(err){
    res.status(500).send("Error in deleting the user")
  }

})

// update a user API 
app.patch('/user/:userId', async (req, res)=>{
  const userId = req.params?.userId
  const data = req.body;
  console.log(data)
  try {
    const AllowedUpdates = [
      "emailId",
      "photoUrl",
      "skills",
      "age",
      "about",
      "gender",
    ];
    const isAllowedUpdates = Object.keys(data).every((k)=>AllowedUpdates.includes(k))
    if(!isAllowedUpdates){
      throw new Error("  you are try to update unchangble data")
    }
    if (data.skills && data.skills.length > 10) {
      throw new Error("The skills data must be lower than 10 skills");
    }

    if (data.about && data.about.length > 201) {
      throw new Error("The about length must be below 201 characters");
    }

      const user = await User.findByIdAndUpdate({ _id: userId }, data, {
        new: true,
        runValidators: true,
      });
      console.log(user);
      res.send("user updated successfully");
    
  } catch (err) {
    res.status(500).send("Update Document failed"  + err.message);
  }
})
// update user by EmailId
app.patch('/user/email', async (req, res)=>{
  const userEmailId = req.body.emailId
  const data = req.body;
  try{
    const users = await User.findOneAndUpdate({ emailId: userEmailId }, data, {
      new: true,
      runValidators: true,
    });
    res.send("user updated successfully by emailId")

  }catch(err){
    res.status(500).send("Error in updating the user by emailId")
  }
})
// PUT API to update a user whole data
app.put('/user', async (req, res)=>{
  const userId = req.body.userId
  const data = req.body;
  try{
    const user = await User.findByIdAndUpdate({_id: userId}, data, {new: true, overwrite: true});
    console.log(user)
    res.send("user updated successfully using put method")
  }catch(err){
    res.status(500).send("Error in updating the user using put method")
  }
})
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



