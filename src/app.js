const express = require('express');

const app = express();

app.get("/",(req,res)=>{
    res.send(
        "Hello you did it! You have successfully set up your Express server.");
});
app.get("/hello",(req, res) => {
  res.send(
    "we are on the hello route."
  );
});
app.get("/test",(req, res) => {
  res.send(
    "we are on the test route."
  );
});

app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})