const express = require('express');

const app = express();


app.get("/user/:userID/:password/:name", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "sanjai", lastName: "kumar" });
});




app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})