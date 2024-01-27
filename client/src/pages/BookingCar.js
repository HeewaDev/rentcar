import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { Col, Divider, Row, DatePicker, Checkbox, Modal } from "antd";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import { useParams } from "react-router-dom";
const { RangePicker } = DatePicker;

function BookingCar({ match }) {
  const { carid } = useParams();

  const car = useSelector((state) =>
    state?.carsReducer?.cars?.find((o) => o._id === carid)
  );
  const { loading } = useSelector((state) => state.alertsReducer);
  // const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  // Other states...

  const dispatch = useDispatch();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  // Inside the component where you calculate totalAmount
  useEffect(() => {
    if (car && car?.rentPerHour && totalHours !== undefined) {
      let amount = car?.rentPerHour * totalHours;
      if (driver) {
        amount += 30 * totalHours; // Assuming driver cost is 30 per hour
      }
      setTotalAmount(amount);
    } else {
      setTotalAmount(0); // Set a default value or handle differently if required
    }
  }, [car, totalHours, driver]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD YYYY HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car?._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    console.log(reqObj);
    // dispatch(bookCar(reqObj));
  }
  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car?.image} className="carimg2 bs1" alt="cars" />
        </Col>

        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal" dashed>
            {" "}
            Car Info
          </Divider>
          <div style={{ textAlign: "left" }}>
            <p>{car?.name}</p>
            <p>{car?.rentPerHour} Rent Per Hour</p>
            <p>Fuel : {car?.fuelType}</p>
            <p>Max Persons : {car?.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            {" "}
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />

          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <p>
                {" "}
                Driver Required :
                <Checkbox
                  className="ml-2"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setdriver(true);
                    } else {
                      setdriver(false);
                    }
                  }}
                ></Checkbox>
              </p>

              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="usd"
                amount={totalAmount * 100}
                stripeKey="pk_test_51OUeCPBnSo6M6JfM1n7wRChx6waYWYjcEBk9VUeCuyoKtszy0aa6HO3QMRe40daZ9AFqXy5acUJAD0phaK8BW9gT00RTzrOq1g"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
      </Row>
      <Modal
        visible={showModal}
        closable={false}
        footer={false}
        title="Booked time slots"
      >
        {car && (
          <div className="p-2">
            {car.bookedTimeSlots.map((slot) => {
              return (
                <button className="btn1 mt-2">
                  {" "}
                  {slot.from} - {slot.to}
                </button>
              );
            })}
            <div className="text-right">
              <button className="btn1" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DefaultLayout>
  );
}

export default BookingCar;
