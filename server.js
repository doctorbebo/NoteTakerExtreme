// Dependancies
const express = require("express");
const path = require("path");

// Starts the app and assigns a PORT
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up middleware to parse data
app.use(express.urlencoded({ extended }));
app.use(express.json());

app.get('/', (req, res,)=>
{
    res.send("Hello you found the home page!")
});