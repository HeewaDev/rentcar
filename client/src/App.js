import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import ProtectedRoute from "./components/ProtectedRoute";
import userBookings from "./pages/userBookings";
import AddCar from "./pages/AddCar";
import Admin from "./pages/Admin";
import EditCar from "./pages/EditCar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            exact
            path="/userbookings"
            element={<ProtectedRoute Component={userBookings} />}
          />
          <Route
            exact
            path="/addcar"
            element={<ProtectedRoute Component={AddCar} />}
          />

          <Route
            exact
            path="/editcar/:carid"
            element={<ProtectedRoute Component={EditCar} />}
          />

          <Route
            exact
            path="/booking/:carid"
            element={<ProtectedRoute Component={BookingCar} />}
          />
          <Route
            exact
            path="/admin"
            element={<ProtectedRoute Component={Admin} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
