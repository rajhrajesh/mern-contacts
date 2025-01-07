const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandeler = require("./middleware/errorHandler");

connectDb();

const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
const cors = require('cors');
app.use(cors());


app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandeler); // middleware here check

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
