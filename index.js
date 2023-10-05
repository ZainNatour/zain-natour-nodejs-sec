const express = require("express");
const books = require("./books.json");
const path = require("path");
const router = require("./router");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files (e.g., your Pug template)
app.use(express.static("public"));

app.set("view engine", "pug"); // Set the view engine to Pug
app.set("views", path.join(__dirname, "templates")); // Set the views directory
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log("Server Is Running.");
});
