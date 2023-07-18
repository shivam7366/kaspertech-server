const express = require("express");
require("./src/mongoose");
const uploadRoutes = require("./src/route");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders:
      "Content-Type, Authorization, Origin, X-Requested-With, Accept",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(uploadRoutes);
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
