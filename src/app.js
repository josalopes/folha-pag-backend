const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errors } = require('celebrate');

const app = express();
app.use(express.json());

// Settings
app.set("port", process.env.PORT || 3333);

// Middlewares
app.use(cors({ origin: "http://localhost:3333" }));
//app.use(cors());

/* END MIDDLEWARE  */
app.use(routes);
app.use(errors());

module.exports = app;
