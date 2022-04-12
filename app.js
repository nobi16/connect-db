require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")

const authRoutes = require("./routes/auth");
const businessRoutes = require("./routes/businessRoutes");
const serviceRoutes = require("./routes/serviceRoute");
const productRoutes = require("./routes/productsRoute")
import {MONGO_URI, PORT} from "./config.json"

//DB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api/user", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/product", productRoutes)

//PORT
const port =  PORT;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
