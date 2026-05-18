const express = require("express");
const { ConnectDB } = require("./utils/dbConnector");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8060;

app.use(cors());
app.use(express.json());

const userRouter = require("./router/userRoutes.js");

const attachRole = (role) => (req, _res, next) => {
  req.role = role;
  next();
};

ConnectDB();

app.use("/api/user", attachRole("user"), userRouter);
app.use("/api/admin", attachRole("admin"), userRouter);
app.use("/api/worker", attachRole("worker"), userRouter);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
