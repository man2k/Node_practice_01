const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

const port = process.env.PORT || 3000;
// middleware
app.use(express.static("./public"));
app.use(express.json());
const notFound = require("./middleware/not-found");
//  routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(errorHandlerMiddleware);
// app.get("/", (req, res) => {
//   res.send("Task Manager App");
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // console.log(connectDB);
    app.listen(port, console.log(`Server is listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
