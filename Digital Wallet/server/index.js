const express = require("express");
const connectDB = require("./config/connectdb");
const cors = require("cors");


const app = express();
connectDB();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// routes
app.use("/api/v1", require("./routes/index"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
