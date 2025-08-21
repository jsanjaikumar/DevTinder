const express = require('express');

const app = express();


app.get("/user", (req, res) => {
  res.send({firstName : "sanjai", lastName : "kumar"});
});

app.post("/user", (req, res)=>{
  //DB was stored in the batabase
  res.send("user data was stored in the database");
})

app.delete("/user", (req, res)=>{
  //DB was deleted from the database
  res.send("user data was deleted from the database");
})

app.use("/test",(req,res)=>{
  res.send("its a test page")
});
 
app.put("/user", (req, res)=>{
  //DB was updated in the database
  res.send("user data was updated in the database");
})

app.patch("/user", (req, res)=>{
  //DB was partially updated in the database
  res.send("user data was partially updated in the database");
})

app.use("/user", (req, res) => {
  res.send("haahaha be carefull when you set api on code");
});

app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})