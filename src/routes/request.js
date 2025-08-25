const express = require("express")
const requestRouter =  express.Router()
const { userAuth } = require("../middlewares/Auth");

//sendConnectionAPI
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res)=>{
  try{
   const user = req.user
    res.send(user.firstName + "  Send Connection ");
}catch{
  res.status(500).send("Error: "+ err.message) 
}
})

module.exports= requestRouter
