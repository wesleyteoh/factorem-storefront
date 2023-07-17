const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());

const port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
