require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const connectToDatabase = require("./src/database/db");

const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ["add", "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const StartServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

StartServer();
