const express = require('express');
const { userAuth } = require('../middlewares/Auth');
const paymentRouter = express.Router()
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require('../utils/constants');
/* NODE SDK: https://github.com/razorpay/razorpay-node */
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')


paymentRouter.post("/payment/create", userAuth, async (req, res)=>{
    try{
        const { membershipType } = req.body
        const {firstName, lastName, emailId} = req.user

      const order = await razorpayInstance.orders.create({
        amount: membershipAmount[membershipType] * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          firstName,
          lastName,
          emailId,
          membershipType: membershipType,
        },
      });

      //save order details to database
      console.log(order);

      const payment = new Payment({
        userId: req.user._id,
        orderId: order.id,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        notes: order.notes,
      });

      const savedPayment = await payment.save();

      // return order details to frontend
      res.json({ ...savedPayment.toJSON(), razorpayKeyId: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
      console.log("Error at payment/create ", err);
      res.status(400).send("Error at payment/create " + err.message);
    }
})

//webhook to update payment status

paymentRouter.post("/payment/webhook", async (req, res) => {
  try{
    const webhookBody = req.body;
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(webhookBody),
      webhookSignature,
      process.env.WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(500).send({ msg: "Invalid webhook signature" });
    }

    //update the payment status in db
    const paymentDetails = req.body.payload.payment.entity; // why we write this line re ref code for webhook payload codes 


    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    //make the user as premium user
    const user = await User.findOne({_id: payment.userId});
      user.isPremium = true;
      user.membershipType = payment.notes.membershipType;

      await user.save();
    

    // if (req.body.event == "payment.captured") {
    // }
    // if (req.body.event == "payment.failed") {
    // }
    //return success response to razorpay dont forget this razor expects 200 status code
    res.status(200).send({ msg: "Webhook received successfully" });
  }catch(err){
    console.log("Error at payment/webhook ", err);
    res.status(400).send("Error at payment/webhook " + err.message);
  }
});

module.exports = paymentRouter;


