const express = require("express");
const Booking = require("../databases/bookingModel");
const car = require("../databases/carModel");
const router = express.Router();


router.post('/bookcar', async(req, res)=>{
    req.body.transactionId = '1234'

    try {
        const newBooking = new Booking(req.body)
        await newBooking.save()
        const car = await car.findOne({_id : req.body.car.toString()})
        car.bookedTimeSlots.push(req.body.bookedTimeSlots)
        await car.save()
        res.status(200).send('Your Booking is succesfull ')
    } catch (error) {
        return res.status(400).json(error)
        
    }

})

module.exports = router