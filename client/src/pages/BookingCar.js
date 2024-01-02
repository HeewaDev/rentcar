import React, { useEffect, useState } from 'react'

import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch} from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { Col, Divider, Row, DatePicker, Checkbox } from 'antd'
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions'
const {RangePicker} = DatePicker

function BookingCar({match}) {

    const {cars} = useSelector(state => state.carsReducer)
    const {loading} = useSelector(state =>state.alertsReducer)
    const [car, setCar] = useState({});
const [from, setFrom] = useState();
const [to, setTo] = useState();
// Other states...

    const dispatch = useDispatch()
    const [totalHours, setTotalHours] = useState(0)
    const [driver, setDriver] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
   

    useEffect(()=>{
        
      // Inside your useEffect:
const carId = match?.params?.carid; // Null check for match and params
if (carId && cars.length > 0) {
    setCar(cars.find(o => o._id === carId));
}

    },
    [cars, match ]
    )

      // Inside the component where you calculate totalAmount
useEffect(() => {
    if (car && car.rentPerHour && totalHours !== undefined) {
        let amount = car.rentPerHour * totalHours;
        if (driver) {
            amount += 30 * totalHours; // Assuming driver cost is 30 per hour
        }
        setTotalAmount(amount);
    } else {
        setTotalAmount(0); // Set a default value or handle differently if required
    }
}, [car, totalHours, driver]);


    function selectTimeSlots(values){
        setFrom(moment(values[0]).format('MMM DD yyyy HH:mm'))
     setTo(moment(values[1]).format('MMM DD YYYY HH:mm'))
        setTotalHours(values[1].diff(values[0], 'hours'))
    }

        function bookNow(){
            const reqObj = {
                user : JSON.parse(localStorage.getItem('user'))._id,
                car : car._id,
                totalHours,
                totalAmount,
                driverRequired:driver,
                bookedTimeSlots: {
                    from,
                    to
                }
            }
            dispatch(bookCar(reqObj))
        }
    return (
        <DefaultLayout>
            {loading && (<Spinner/>)}

            <Row justify='center' className='d-flex align-items-center' style={{minHeight:'90vh'}}>
                <Col lg ={10} sm={24} xs={24}>
                <img src={car.image} className='carimg2 bs1' alt='cars'/>
                </Col>

                <Col lg ={10} sm={24} xs={24}>
                <Divider type='horizontal' dashed> Car Info</Divider>
                <div style={{textAlign:'right'}}>
                    <p>{car.name}</p>
                    <p>{car.rentPerHour} Rent Per Hour</p>
                    <p>Fuel : {car.fuelType}</p>
                    <p>Max Persons : {car.capacity}</p>
                </div>

                <Divider type='horizontal' dashed> Select Time Slots</Divider>
                <RangePicker showTime={{format:'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={selectTimeSlots}/>

                <div>
                    <p>Total Hours : {totalHours}</p>
                    <p> Rent Per Hour: <b>{car.rentPerHour}</b></p>
                    <Checkbox onChange={(e)=>{ 
                        if(e.target.checked){
                            setDriver(true)
                        } else{
                            setDriver(false)
                        }
                    }}>Driver Required </Checkbox>
                    <p>We have best drivers to provide and assist you with best service including refilling up to 60 litre of fuel on us</p>
                    <h3>Total Amount : {totalAmount} </h3>
                    <button className='btn1' onClick={bookNow}> Book Now</button>
                </div>
                </Col>

            </Row>
        </DefaultLayout>
    )
}

export default BookingCar
