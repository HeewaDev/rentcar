// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store';
import { RouterProvider } from 'react-router-dom';
import router from './App';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      <ProtectedRoute path="/" exact element={<Home />} />
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);


