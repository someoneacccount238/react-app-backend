import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";


import { registerValidation, loginValidation } from "./validations.js";
import { validationResult } from "express-validator";

import { handleValidationErrors, checkAuth } from "./middleware/index.js";

import { UserController, EntriesController, CalendarController } from "./controllers/index.js";


import data2 from  "./foodList.json"  with { type: "json" };
import data1 from "./food.json" with { type: "json" }; 
  


mongoose
  .connect(
    "mongodb+srv://dbUser:dbPassword@cluster0.u9lba.mongodb.net/dateEntry?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();
 



app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

  // app.get("/*", function(req,res){
  //   res.sendFile(
  //     path.join(__dirname,"../client/build/index.html"),
  //     function(err){
  //       if(err){
  //         res.status(500).send(err);
  //       }
  //     }
  //   )
  // })
  
  // app.use(express.static(path.join(__dirname,'client/build')))

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.post("/auth/me", checkAuth, UserController.getMe);

app.get("/mytotals/", EntriesController.getAll);
app.post("/mytotals/add", EntriesController.addFoodEntry);
app.delete("/mytotals/:id", EntriesController.deleteFoodEntry); 

app.get("/calendar/:user_id", CalendarController.getAllSortedById);
app.post("/calendar/:date", CalendarController.update);
app.post("/calendar/add", CalendarController.addDateEntry);
app.delete("/calendar/:date", CalendarController.deleteFoodEntry); 
 
 
app.get("/food",(request,response)=>{
  response.json(data1)
});
app.get("/food2",(request,response)=>{
  response.json(data2)
});
 
app.post("/api/json",(request,response)=>{
  // response.json(data);
  // console.log ((request.body))
  fs.writeFileSync('./foodList.json', JSON.stringify(request.body))
  // console.log(response)
});  
 

app.listen(process.env.PORT || 1444, (err) => {
  if (err) {
    // return console.log(err);
  }

  console.log("Server OK");
});

//   fetch('localhost:1444/food.json')  .then(function(response){
// return response.json()}). then(function(obj){
//   console.log(obj)}).catch(function (error){console.log(error)})
 