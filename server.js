const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");

const app = express();

//HANDLEBARS VIEW ENGINE
app.engine(
  "hbs",
  hbs({ extname: "hbs", layoutsDir: "./layouts", defaultLayout: "main" })
);
app.set("view engine", ".hbs");

//INIT PASSPORT
app.use(session({ secret: "anything", resave: true, saveUninitialized: true }));
app.use(passport.session());

// SESSION CONFIG
app.use(passport.initialize());
const passportConfig = require("./passport");

//STANDARD MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

//LOG SESSION VALUES
app.use((req, res, next) => {
  console.log("req._passport ", req._passport.session);
  console.log("req.session ", req.session);
  console.log("req.user ", req.user);
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.use("/", (req, res) => {
  res.status(404).render("notFound");
});

app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});
