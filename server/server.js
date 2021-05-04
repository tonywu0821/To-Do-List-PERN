const express = require("express");

const cors = require("cors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/authentication");
const dashboardRouter = require("./routes/dashboard");

//routers
app.use("/authentication", authRouter);
app.use("/dashboard", dashboardRouter);

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
