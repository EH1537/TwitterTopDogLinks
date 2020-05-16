const path = require('path');
const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const PORT = 3437;
const passport = require("passport");
const passportSetup = require("./secretConfig/passportSetup");
const session = require("express-session");
const authorizeRoute = require("./routes/authorizeRoute");
const mongoose = require("mongoose");
const { COOKIE_KEY } = require("./secretConfig/secretsAndKeys");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: [COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100 //24 hours
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());


// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);


// set up routes
app.use("/auth", authorizeRoute);
app.use('/', express.static(path.join(__dirname , '../dist')))


app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  console.log(err);
  return
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;