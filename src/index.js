const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const requestLogger = require("./middlewares/requestLogger");
const connectDB = require("./config/db");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

const app = express();

// ✅ FIX: fallback port
const PORT = process.env.PORT || 3001;

// Middleware
app.use(requestLogger);
app.use(helmet());

// DB
connectDB();

// Logger
const log4js = require("log4js");
const appLogger = log4js.getLogger();
app.use(log4js.connectLogger(appLogger));

// CORS
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

global.appRoot = path.resolve(__dirname);

// Routes
const router = require("./api/routes");
router(app);

// ✅ LISTEN CORRECTLY
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Express server running on port ${PORT}`);
});
