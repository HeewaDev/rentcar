const express = require("express");

const Booking = require("../databases/bookingModel");
const Car = require("../databases/carModel");
const stripe = require("stripe")(
  "pk_test_51OUeCPBnSo6M6JfM1n7wRChx6waYWYjcEBk9VUeCuyoKtszy0aa6HO3QMRe40daZ9AFqXy5acUJAD0phaK8BW9gT00RTzrOq1g"
);
const router = express.Router();
const { v4, uuidv4 } = require("uuid");

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // const payment = await stripe.charges.create(
    //   {
    //     amount: req.body.totalAmount * 100,
    //     currency: "usd",
    //     customer: customer.id,
    //     receipt_email: token.email
    //   },
    //   {
    //     idempotencyKey: uuidv4(),

    //   }
    // );

    if (true) {
      req.body.transactionId = Math.random();
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    } else {
      res.send("Your booking is successfull");
    }
  } catch (error) {
    console.log(error);
    return res.send("Your booking is successfull");
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
