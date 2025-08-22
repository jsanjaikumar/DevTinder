const express = require('express');

const app = express();
const { adminAuth, userAuth } = require("./middlewares/Auth.js");


//app.use('/admin', adminAuth );

app.get('/userData', (req, res) => {
  console.log(" its the login api to post the data");
  throw new Error('error in the login wroung details')
  res.send('User logged in successfully');
});

app.use ('/', (err, req, res, next)=>{
  if (err){
    res.status(500).send('somthing went wroung')
  }
})


app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})