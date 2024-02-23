require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const apiRoutes = require("./routes/api");

const startServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  await connectDB();

  // Use apiRoutes
  app.use("/api", apiRoutes);

  // Global error handling middleware should be placed after all other middleware/route handlers
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
      error: "An internal error occurred",
      message: err.message,
    });
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

startServer().catch(console.error);
