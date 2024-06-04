import express from "express";
import mongoose from "mongoose";
const app = express();
mongoose.connect("mongodb+srv://abhinavajay20:YTlDkRoyR3y23uu4@cluster0.xowutff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to Databse");
}).catch((err)=>{
    console.log("Error connecting to the database"); 
});
const portNo = 3000;
app.listen(portNo,()=>{
    console.log("Server is running on port",portNo);
});