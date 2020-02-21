const request = require("request");
bodyParser = require("body-parser");
const moment = require("moment");

val = "";

module.exports = function interval() {
  const options = {
    method: "POST",
    url: "http://api.brain.com.ua/auth",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic Og=="
    },
    formData: {
      login: "Toxich6565@mail.ru",
      password: "a29dc2e94c31b0807b734370b4651149"
    }
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    val = JSON.parse(response.body);
    process.env.SID = val.result;
    process.env.SIDSTATUS = val.status;
    console.log(
      "SID: " +
        process.env.SID +
        " || " +
        moment().format("MMMM Do YYYY, h:mm:ss a")
    );
    console.log("status: " + process.env.SIDSTATUS);
  });
};
