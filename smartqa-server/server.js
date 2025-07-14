require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const roomRoutes = require('./src/routes/roomRoutes')
const session = require("express-session");
const passport = require("passport");
require("./src/config/passport")(passport);


const app = express();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Mongo DB Connected"))
    .catch((error) => console.log("Error in connecting DB", error));


//middlewares
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

const corsConfig = {
    origin: process.env.CLIENT_URL,
    credentials: true
};

app.use(cors(corsConfig));

//start server
const Port = process.env.PORT;

app.listen(Port, (error) => {
    if (error) {
        console.log("Error is there.Server not starting due to ", error);
    }
    else {
        console.log("Server started at port:", Port);
    }
});
