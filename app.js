const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config/config.env" });

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passport config
require("./config/passport")(passport);

// session config
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
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
app.use("/stories", require("./routes/stories"));

// handlebars helpers
const { formatDate, stripTags, truncate, editIcon, select } = require("./helpers/hbs.helper");
// Express - handlebars
app.engine(
  ".hbs",
  engine({
    helpers: { formatDate, stripTags, truncate },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

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
