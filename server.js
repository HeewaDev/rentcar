const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./databases/db'); // Import the connectDb function
const carRoute = require('./routes/carRoutes');
const userRoute = require('./routes/usersRoute');
const bodyParser = require('body-parser');
dbConnection(); // Call the function to establish the MongoDB connection
app.use(express.json())

const cors = require('cors');
const bookingRoute = require('./routes/bookingsRoute');

// Allow requests from 'localhost:3000', 'localhost:3001', and 'localhost:3002'
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
};

app.use(cors(corsOptions));

app.use('/api/cars', carRoute)
app.use('/api/users', userRoute)
app.use('/api/bookings', bookingRoute)
app.get('/', (req, res) => res.send('Success'));

app.listen(port, () => console.log(`Node.js server started at port ${port}`));
