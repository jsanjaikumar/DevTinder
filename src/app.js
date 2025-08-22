const express = require('express');

const app = express();

// app.get("/user", RH1,RH2,RH3, RH4)

app.use(
  "/user",
  [(req, res, next) => {
    console.log("User middleware executed");
    next();
    //res.send("User route accessed");
  },
  (req, res, next) => {
    console.error("Error in user route:");
    //res.send("second response to one path 2");
    next();
  }],[
  (req, res, next) => {
    console.error("Error in user route:");
    //res.send("three response to one path 3");
    next();
  },
  (req, res, next) => {
    console.error("Error in user route:");
    //res.send("four response to one path 3");
    next();
  }],
  (req, res, next) => {
    console.error("Error in user route:");
    res.send("5th response to one path 5");
  }
);


app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})