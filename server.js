const express = require("express");
const path = require("path");
// const favicon = require("serve-favicon");
const logger = require("morgan");

require("dotenv").config();
// const pool = require("./config/database");
// require("./config/database");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(require("./config/checkToken"));

// app.use("/api", require("./routes/api/music"));
app.use("/api/users", require("./routes/api/users"));
app.use("/products", require("./routes/api/products"));
app.use("/api/history", require("./routes/api/history"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/adminSide", require("./routes/api/admin"));

app.get("/hi", (req, res) => res.json({ msg: "hi" }));

//--catch all
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
