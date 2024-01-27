import { message } from "antd";
import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  console.log("getAllCars");
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/cars/getallcars"
    );
    console.log("response", data);
    // const data = await response;

    dispatch({ type: "GET_ALL_CARS", payload: data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log("error in getAllCars", error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  console.log("getAllCars");
  try {
    await axios.post("http://localhost:5000/api/cars/addcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("New Car Added Successfully");

    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log("error in getAllCars", error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  console.log("getAllCars");
  try {
    await axios.post("http://localhost:5000/api/cars/editcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Car Details Updated Successfully");

    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log("error in getAllCars", error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const DeleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  console.log("getAllCars");
  try {
    await axios.post("http://localhost:5000/api/cars/deletecar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Car Item Deleted Successfully");
    dispatch(getAllCars());
  } catch (error) {
    console.log("error in getAllCars", error);
    dispatch({ type: "LOADING", payload: false });
  }
};
