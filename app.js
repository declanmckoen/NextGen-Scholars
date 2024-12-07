const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userProfileRoutes = require("./src/routes/userProfileRoutes");
const authRoutes = require("./src/routes/authRoutes");
const { requireAuth, checkCurrUser } = require("./src/middleware/authMiddleware");
const cookieParser = require("cookie-parser");

// express app
const app = express();


// connect to mongodb
const dbURI = 'mongodb+srv://admin:nextgenscholars@nextgen-scholars.u2uev.mongodb.net/NextGen-Scholars?retryWrites=true&w=majority&appName=NextGen-Scholars';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


// register view engine
// Automatically looks in "views" folder
app.set("view engine", "ejs");
app.set("views", "src/views");


// middleware and static files
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


// Render pages
app.get("*", checkCurrUser);
app.get("/", checkCurrUser, (req, res) => res.render("index"));
app.use(userProfileRoutes);
app.use(authRoutes);


