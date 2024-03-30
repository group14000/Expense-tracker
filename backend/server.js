const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const signupRoutes = require("./routers/userRouter");
const loginRoutes = require("./routers/userRouter");
const expenseRoutes = require("./routers/expenseRouter");

// Middleware
app.use(cors()); // Use cors middleware to enable CORS

app.use(express.json());

// Routes
app.use("/", signupRoutes);
app.use("/", loginRoutes);
app.use("/", expenseRoutes);

app.use(bodyParser.json({ extended: false }));

// Sync Sequelize models with the database and start the server
sequelize
  .sync()
  .then(async () => {
    // Start the server
    const PORT = 3000;
    app.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);

      // Authenticate Sequelize with the database
      try {
        await sequelize.authenticate();
        console.log("Database connected");
      } catch (err) {
        console.error("Database connection error:", err);
      }
    });
  })
  .catch((err) => {
    console.error("Error syncing Sequelize models:", err);
  });
