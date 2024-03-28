// routerConfig.js
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import userBookings from './pages/userBookings';
import AddCar from './pages/AddCar';
import Admin from './pages/Admin';
import EditCar from './pages/EditCar';
import ProtectedRoute from './components/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
       element : <ProtectedRoute />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/booking/:carid',
    element: <BookingCar />,
  },
  {
    path: '/userbookings',
    element: <userBookings />,
  },
  {
    path: '/addcar',
    element: <AddCar />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/editcar/:carid',
    element: <EditCar />,
  },
];

const router = createBrowserRouter(routes);

export default router;
