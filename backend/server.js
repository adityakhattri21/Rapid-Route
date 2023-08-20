const server = require("./app");
require("dotenv").config();
require("./database/conn");
const port = process.env.PORT || 4000;

server.listen(port,()=>{
    console.log(`Server is running at port : ${port}`)
})