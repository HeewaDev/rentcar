import { Route, Navigate } from "react-router-dom";
import BookingCar from "../pages/BookingCar";

function ProtectedRoute({ Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem("user");

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
