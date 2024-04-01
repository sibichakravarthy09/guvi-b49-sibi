const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());



let rooms = [
  {
    id: 1,
    name: "small",
    seats: 10,
    roomId: 400,
    amenities: ["internet_access", "food", "ac", "tv"],
    price: 500,
    BookingStatus: "Occupied",
    customerDetails: {
      customerName: "Iron man",
      date: "2024-10-02",
      start: "16:00",
      end: "21:00",
      roomId: "001",
      status: "Booked",
    }
  },
  {
    id: 2,
    name: "Large",
    seats: 15,
    roomId: 401,
    amenities: ["internet_access", "food", "ac", "tv"],
    price: 1000,
    BookingStatus: "Available",
    customerDetails: {
      customerName: "",
      date: "",
      start: "",
      end: "",
      roomId: "",
      status: "",
    }
  },
  {
    id: 3,
    name: "medium",
    seats: 20,
    roomId: 402,
    amenities: ["internet_access", "food", "ac", "tv"],
    price: 750,
    BookingStatus: "Available",
    customerDetails: {
      customerName: "",
      date: "",
      start: "",
      end: "",
      roomId: "",
      status: "",
    }
  },
  {
    id: 4,
    name: "extra large",
    seats: 30,
    roomId: 403,
    amenities: ["internet_access", "food", "ac", "tv"],
    price: 1500,
    BookingStatus: "Occupied",
    customerDetails: {
      customerName: "Hulk",
      date: "2024-12-1",
      start: "16:00",
      end: "21:00",
      roomId: "004",
      status: "Booked",
    }
  }
];

// Endpoint to get all data from rooms
app.get('/', function (req, res) {
  res.send(rooms);
});

// Endpoint to create a new room
app.post('/create-room', function (req, res) {
  try {
    req.body.id = rooms.length + 1;
    rooms.push(req.body);
    res.json({
      statusCode: 200,
      message: "Room created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

// Endpoint for room booking
app.post('/room-booking', function (req, res) {
  try {
    let booked = false;
    let validRoomid = true;
    rooms.forEach((item) => {
      if (item.roomId == req.body.roomId) {
        validRoomid = false;
        if (new Date(item.customerDetails.date).getTime() != new Date(req.body.date).getTime() && item.customerDetails.start != req.body.start) {
          item.customerDetails = {
            customerName: req.body.customerName,
            date: req.body.date,
            start: req.body.start,
            end: req.body.end,
            roomId: req.body.roomId,
            status: "Booked",
          };
          item.BookingStatus = "Occupied";
          booked = true;
        }
      }
    });

    if (booked) {
      res.json({
        message: "Booking Successful"
      });
    } else if (validRoomid) {
      res.json({
        message: "Please Enter a Valid Room"
      });
    } else {
      res.json({
        message: "Booking Failed",
        instruction: "Sorry! The room is already booked. Please check the availability."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

// Endpoint to get booked customer details
app.get('/booked-customer-details', function (req, res) {
  try {
    let data = rooms.filter(item => item.BookingStatus === "Occupied").map(item => item.customerDetails);
    res.json({
      statusCode: 200,
      Booked_Customer_Details: data,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

// Endpoint to get booked room details
app.get('/booked-room-details', function (req, res) {
  try {
    let data = rooms.filter(item => item.BookingStatus === "Occupied").map(item => ({
      name: item.name,
      seats: item.seats,
      amenities: item.amenities,
      price: item.price,
      BookingStatus: item.BookingStatus,
      customerDetails: item.customerDetails
    }));
    res.json({
      statusCode: 200,
      Booked_Room_Details: data,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
