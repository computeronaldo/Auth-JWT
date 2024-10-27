const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectToDB = require("./db/db");
const routes = require("./routes");

const privateRouteCORS = {
  origin: (origin, callback) => {
    if (origin === "http://localhost:5173") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const DBConnectWrapper = async () => {
  try {
    await connectToDB();
  } catch (err) {
    console.log(err.message);
  }
};

DBConnectWrapper();

app.use(cors(privateRouteCORS));
app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server running on PORT 3000");
});
