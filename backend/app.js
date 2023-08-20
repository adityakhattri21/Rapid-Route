const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const path = require("path");


app.use(express.json());
app.use(express.static(path.join(__dirname,"../frontend/build")))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin:'*'
}));

app.use("/api/v1",urlRoutes);

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
});



app.use(errorMiddleware);

module.exports = app;