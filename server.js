const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Validation function
function valid(data) {
    return (
        data.fullname &&
        data.email &&
        data.age &&
        data.gender &&
        data.message
    );
}

app.post("/submit", (req, res) => {

    if (!valid(req.body)) {
        return res.status(400).send("Invalid submission. Fill all fields.");
    }

    res.render("result", { info: req.body });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
