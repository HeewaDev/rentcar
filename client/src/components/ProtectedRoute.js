import { Route, Navigate } from "react-router-dom";
import BookingCar from "../pages/BookingCar";

function ProtectedRoute({ Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem("user");

  return isAuthenticated ? (
    <Route element={<BookingCar {...rest} />} />
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
