const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const apiV1 = require("./routes/api.v1");

const app = express();

// Middlewares: =======================================

// Security
app.use(helmet());
// Logs
app.use(morgan("common"));
// app.use((req, res, next) => {
//   console.log("IP is: ", req.ip);
//   next();
// });
// Cors
app.use(cors({ origin: "*" }));
// Parse
app.use(express.json());
// Front-End
app.use(express.static(path.join(__dirname, "..", "public")));
// Routes
app.use("/v1", apiV1);
// Main Route: sent the NASA React Front-End.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// End Testing ===================================================

module.exports = app;

// ===================================================
// Documentation: ------------------------------------
// ===================================================

// app.use("/someRoute", (req, res)); // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

/* 
// app.use(cors({ origin: "http://localhost:3000" }));
// const corsWhitelist = ["http://localhost:5000"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (corsWhitelist.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("HEY THERE! Remember to set the cors..."));
//       }
//     },
//   })
// ); 
*/
