import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBookings, bookCar } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner.js";
const user = JSON.parse(localStorage.getItem("user"));
function UserBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookingsReducer?.bookings);
  const loading = useSelector((state) => state.alertsReducer?.loading);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <DefaultLayout>
      {console.log(bookings)}
      {loading && <Spinner />}
      <h3 className="text-center mt-2">My Bookings</h3>
      <Row justify="center">
        <Col lg={16} sm={24}>
          {bookings && bookings.length > 0
            ? bookings
                .filter((o) => o.user === user._id)
                .map((booking) => {
                  return (
                    <Row className="bs1 mt2 text-left" gutter={16}>
                      <Col lg={6} sm={24}>
                        <p>
                          <b>{booking?.car?.name}</b>
                        </p>
                        <p>
                          Total Hours: <b>{booking?.totalHours}</b>
                        </p>
                        <p>
                          {" "}
                          Rent Per Hour: <b>{booking?.car?.rentPerHour}</b>
                        </p>
                        <p>
                          Total Amount: <b>{booking?.totalAmount}</b>
                        </p>
                      </Col>

                      <Col lg={12} sm={24}>
                        <p>
                          {" "}
                          TransactionID : <b>{booking?.transactionId}</b>
                        </p>
                        <p>
                          {" "}
                          From : <b>{booking?.bookedTimeSlots?.from}</b>
                        </p>
                        <p>
                          {" "}
                          To : <b>{booking?.bookedTimeSlots?.to}</b>
                        </p>
                        <p>
                          {" "}
                          Date of Booking :{" "}
                          <b>
                            {moment(booking?.createdAt)?.format(
                              "MMM DD yyyy H:H"
                            )}
                          </b>
                        </p>
                      </Col>

                      <Col lg={6} sm={24}>
                        <img
                          style={{ borderRadius: 5 }}
                          src={booking?.car?.image}
                          height="150"
                          alt="carpic"
                        />
                      </Col>
                    </Row>
                  );
                })
            : null}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
