const express = require("express")
const authRouter = express.Router();

const User = require("../models/user");
const { signupDataValidate } = require("../utils/validator");
const bcrypt = require("bcrypt");



//signUp API 
authRouter.post("/signup", async (req, res) => {
  try{
  //Validate the request first
  signupDataValidate(req)

  const { firstName, lastName, emailId, password } = req.body;

  //encrpting passwords and other datas
   
  const passwordHash = await bcrypt.hash(password, 10)
  // creating a new instance of the User modal
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

//login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invaild Credentials");
    }
    const isPasswordValid = await user.validPassword(password);
    if (isPasswordValid) {
      //creating cookies
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfully");
    } else {
      throw new Error("Invaild Credentials");
    }
  } catch (err) {
    res.status(500).send("Error " + err.message);
  }
});

module.exports = authRouter
