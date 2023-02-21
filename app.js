const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config/config.env" });

// middleware
app.use(express.static(path.join(__dirname, "public")));

// passport config
require("./config/passport")(passport);

// session config
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
// Passport initialize
app.use(passport.initialize());
app.use(passport.session());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

// Express - handlebars
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Server run
const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(`server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
startDB();
