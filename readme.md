# first npm init 
 to start the project and add the package.json file in the project folder

# then Express js installation



 catch (err) {
      res.status(500).send("Error: " + err.message);
    }

    try{
    const loggedInUser = req.user
    const AllowedStatus = ["accepted", "rejected"]
    if(!AllowedStatus.includes(status)){
      return res.json({message: "Invalid Status request"})
    }
    const {status, requestId } = req.params;
    
  } catch (err) {
      res.status(500).send("Error: " + err.message);
    }


    try{
  const loggedInUser = req.user

  const {status, requestId} = req.params;
  const AllowedStatus = ["accepted", "rejected"];
  if(!AllowedStatus.includes(status)){
    return res.status(400).json({message: "invalid status request " + status})
  }

  const connectionRequest = await connectionRequestModel.findOne({
    _id : requestId,
    toUserId: loggedInUser._id,
    status: "interested",
  })
  if(!connectionRequest){
    return res.status(400).json({message: "connection request not found"})
  }

   connectionRequest.status = status

  const data = await connectionRequest.save()

  res.json({message: "Connection Request was " + status, data})
}catch(err){
  res.status(500).send("Error: " + err.message);
}