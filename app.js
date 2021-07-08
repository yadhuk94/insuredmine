const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./utils/connectdb");
const dataRouter = require("./routes/dataRoutes");
const policyRouter = require("./routes/policyRoutes");

dotenv.config({ path: "./config.env" });
const app = express();

connectDB();

app.use(express.json());

app.use((req, res, next) => {
  req.dirname = __dirname;
  next();
});

app.use("/api/v1/data", dataRouter);
app.use("/api/v1/policy", policyRouter);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
