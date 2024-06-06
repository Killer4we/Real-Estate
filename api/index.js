import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";

const app = express();
mongoose.connect("mongodb+srv://abhinavajay20:YTlDkRoyR3y23uu4@cluster0.xowutff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to Database");
}).catch((err)=>{
    console.log("Error connecting to the database"); 
});
const portNo = 3000;
app.listen(portNo,()=>{
    console.log("Server is running on port",portNo);
});

app.use('/api/auth',authRouter);