const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.static(path.join(__dirname, "public")));

// Load config
dotenv.config({ path: "./config/config.env" });

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/", require("./routes/index"));

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
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
startDB();
