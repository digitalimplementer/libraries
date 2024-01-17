const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const authRoutes = require("./routes/authRoute");
const roleRoutes = require("./routes/roleRoute");
const bookRoutes = require("./routes/bookRoute");
const userRoutes = require("./routes/userRoute");

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models/index");

db.sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to the database: " + err.message);
  });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

module.exports = app;
