const express=require("express");


const app=express();

const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");
const cors = require('cors');
require("dotenv").config();


const connectDB=require("./db");
connectDB();
app.use(express.json());


app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );

app.options('*', cors()); 

app.use("/api", userRoutes);
app.use("/api", historyRoutes);

const port=process.env.PORT || 2000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});