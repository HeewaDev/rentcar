const express = require("express");
const router = express.Router();
const Car = require("../databases/carModel"); // Assuming 'carModel' holds the Car model

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

// Other routes (edit, delete) follow the same structure

module.exports = router; // Export the router instance
