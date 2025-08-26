const express = require("express")
const requestRouter =  express.Router()
const { userAuth } = require("../middlewares/Auth");
const connectionRequestModel = require("../models/connectionRequest")
const User = require("../models/user")

//sendConnectionAPI
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {

      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const AllowedStatus = ["interested", "ignored"]
      if(!AllowedStatus.includes(status)){
        return res.status(400).json({message: "invaild status type " + status});
      }
      //to check the touser isr equest to touser 
      const toUser = await User.findById(toUserId)
      if(!toUser){
        return res.status(404).send("user not found")
      }
//to  optimize the &or instance to make faster create a index schema in DB check in 
      const connectionRequestExisting = await connectionRequestModel.findOne({
        $or:[
          {fromUserId:fromUserId, toUserId:toUserId},
          {fromUserId: toUserId, toUserId: fromUserId},
        ]
      })
         if (connectionRequestExisting) {
           return res.status(400).json({message: "connection request is sAlready exists"})
         }

      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status
      })

      const data = await connectionRequest.save()
      res.json({
        message : req.user.firstName + " is " + status + " in "+ toUser.firstName,
        data,
      });
    } catch(err) {
      res.status(500).send("Error: " + err.message);
    }
  }
);

module.exports= requestRouter
