require("./db/mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace this with your frontend domain, gives 5173 ability to access backend resources
    credentials: true, // this part sends the cookies to the frontend
  })
);

const port = 3001;

const usersRoutes = require("./routes/usersRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const habitRoutes = require("./routes/habitRoutes");
const weeklyReviewRoutes = require("./routes/weeklyReviewRoutes");

app.use("/api/users", usersRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/habit", habitRoutes);
app.use("/api/weekly-review", weeklyReviewRoutes);

app.listen(port, () => {
  console.log("App is running on port", port);
});
