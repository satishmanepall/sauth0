const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const requestLogger = require('./middlewares/requestLogger')
const connectDB = require('./config/db');
//const swaggerUi = require("swagger-ui-express");
//const swaggerFile = require("../swagger_output.json");
require("dotenv").config();
mongoose.promise = global.promise;
mongoose.set("strictQuery", true);
// Express app instance
const app = express();
const PORT = process.env.PORT;
app.set("port", PORT);
// Use request logging middleware
app.use(requestLogger)
// helmet for security purpose
app.use(helmet());
// Connect to MongoDB
connectDB();
// Logging Http Request
const log4js = require("log4js");
const appLogger = log4js.getLogger();
app.use(log4js.connectLogger(appLogger));

// CORS - To hanlde cross origin requests
const cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

// Parsing the body of the http
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

global.appRoot = path.resolve(__dirname);

// Swagger Documentation
//app.use("/doc", swaggerUi.serve);

// mount the api routes
const router = require("./api/routes");
router(app);

app.listen(PORT, () => {
  console.log(`Express server started at port: ${PORT}`);
});
