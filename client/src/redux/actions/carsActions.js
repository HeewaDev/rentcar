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
