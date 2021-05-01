require("dotenv").config();
var cors = require("cors");
var bodyParser = require("body-parser");
const express = require("express");
const server = express();
let queries = require("./src/queries");

const PORT = process.env.PORT || 8000;

const debugEnabled = process.env.DEBUG === "true";

server.use(cors());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: false }));
server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

server.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});

server.post("/postNewData", async function (req, res) {
  const { data, location, uuid } = req.body;
  if (!data || !location || !uuid || !location.place_id) return res.send("err");
  queries
    .saveNewData(data, location.place_id, uuid)
    .then(() => {
      console.log("insert success");
      res.send("success");
    })
    .catch((err) => res.send("err"));
});
