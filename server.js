var express = require("express");
var path = require("path");

var app = express();
var PORT =  process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Notes = [
    {
        Name: "Test",
        Text: "This is the text inside notes itself"
    }
]


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });