import express from "express";
const app = express();

const portNo = 3000;
app.listen(portNo,()=>{
    console.log("Server is running on port",portNo);
});