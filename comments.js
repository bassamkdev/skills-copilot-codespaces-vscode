// Create web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
//create a port
const port = 3000;

//read json file
const comments = JSON.parse(fs.readFileSync(path.join(__dirname, "comments.json"), "utf-8"));

app.use(bodyParser.json());

//create a route
app.get("/comments", (req, res) => {
    res.json(comments);
});

app.post("/comments", (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFileSync(path.join(__dirname, "comments.json"), JSON.stringify(comments, null, 2));
    res.json(comment);
});

//listen on port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});