const express = require("express");
const morgan = require("morgan");
const dotenv = require('dotenv')
const { default: mongoose } = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');

const app = express();

dotenv.config()

// connect to mongodb
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3003))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about");
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404");
});
