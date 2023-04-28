const mongoose = require("mongoose"); // imprting mongoDB library
const express = require("express"); // importing express library
const adminRoutes = require("./Routes/adminRoutes");
const isBlog = require('./Middlewares/isBlog');
const BlogSetting = require('./Models/blogSettingModel');
const userRoutes = require('./Routes/userRoutes');
const blogRoute = require('./Routes/blogRoutes');

mongoose.connect("mongodb://3.80.117.113/BMS").then(()=>{
    console.log("Connected to Database on port 27017...")
}).catch((error) => {
    console.log("Error while connecting to Database!!! ", error)
}); // if BMS doesn't exist will create one

const app = express();

// creating server listen
app.listen(2009, function(){
    console.log("Application is running on port 2009...");
});

// applying middleware
app.use(isBlog.isBlog);

//admin routes
app.use("/",adminRoutes);

//user routes
app.use('/',userRoutes);

//blog routes
app.use("/",blogRoute);