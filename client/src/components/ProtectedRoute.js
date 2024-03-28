import React, { useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { userLogin } from '../redux/actions/userActions';

const adminUsers = [
  { username: "danny", password: "Danny135" },
  { username: "sara", password: "sara135" },
  { username: "arazu", password: "arazu135" },
  { username: "fatma", password: "fatma135" },
  { username: "danar", password: "danar135" }
];

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  
  // Check if the user is authenticated and has admin role
  if (user) {
    setIsAuthenticated(true);
    setIsAdminUser(adminUsers.some(
      adminUser =>
        adminUser.username.toLowerCase() === user.username.toLowerCase() &&
        adminUser.password === user.password
    ));
  }

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          isAdminUser ? (
            <Component />
          ) : (
            <Navigate to="/admin" replace />
          )
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;
