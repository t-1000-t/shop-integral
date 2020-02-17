const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
const FormData = require("form-data");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

const formdata = new FormData();
formdata.append("login", `${process.env.LOGINSAI}`);
formdata.append("password", `${process.env.PASSWORDSAI}`);

app.get("/sai", (req, res) => {
  const url = "http://api.brain.com.ua/auth";
  fetch(`${url}`, {
    method: "POST",
    body: formdata
  })
    .then(response => response.json())
    .then(json => {
      res.json(json);
    })
    .catch(error => console.log("error", error));
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found");
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
