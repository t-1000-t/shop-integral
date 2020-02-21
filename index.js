const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");

const interval = require("./interval");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

number = [];

setInterval(() => {
  if (number.length === 1) {
    interval();
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  number.push(getRandomInt(99));
  if (number.length > 200) {
    number = [];
  }
}, 3000);

// app.use(function(req, res, next) {
//   console.log(process.env.SID + "!");

//   next();
// });

app.get("/categories", (req, res) => {
  const url = `http://api.brain.com.ua/categories/${process.env.SID}`;
  fetch(`${url}`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => res.json(json))
    .catch(error => console.log("error", error));
});

// app.get("/products", (req, res) => {
//   const url = `http://api.brain.com.ua/products/1181/${process.env.SID}`;
//   fetch(`${url}`, {
//     method: "GET"
//   })
//     .then(response => response.json())
//     .then(prod => prod.result)
//     .then(json => {
//       res.json(json);
//     })
//     .catch(error => console.log("error", error));
// });

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
