const express = require('express');

const app = express();
const { adminAuth, userAuth } = require("./middlewares/Auth.js");


app.use('/admin', adminAuth );

app.post('/user/login', (req, res) => {
  console.log(" its the login api to post the data");
  res.send('User logged in successfully');
});

app.get('/user/data', userAuth, (req, res) => {
  console.log("its a user path the data api");
  res.send('User route accessed');
});

app.get("/admin/AllData", (req, res, next) => {
  console.log("Admin route accessed")
  res.send('Admin route accessed to the All data base');
  ;})

app.get("/admin/deleteUser", (req, res, next)=>{
  console.log("Admin route accessed to delete user")
  res.send('Admin route accessed to delete user');
})




app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})