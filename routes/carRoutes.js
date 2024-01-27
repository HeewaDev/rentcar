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
    console.log(newCar);
    await newCar.save();
    res.send("Car added successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.capacity = req.body.capacity;
    car.rentPerHour = req.body.rentPerHour;

    await car.save();
    res.send("Car Details Updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car Item Deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// Other routes (edit, delete) follow the same structure

module.exports = router; // Export the router instance
