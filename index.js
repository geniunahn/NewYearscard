const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

let nameArr = [];
let textArr = [];
let dateArr = [];

const nameFile = fs.readFileSync("nameDB.json", "utf-8");
const textFile = fs.readFileSync("textDB.json", "utf-8");
const dateFile = fs.readFileSync("dateDB.json", "utf-8");

const nameData = JSON.parse(nameFile);
const textData = JSON.parse(textFile);
const dateData = JSON.parse(dateFile);

nameArr = [...nameData];
textArr = [...textData];
dateArr = [...dateData];

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home
app.get("/", function (req, res) {
  res.render("pages/index.ejs", { nameArr, textArr, dateArr });
});

// create
app.post("/create", function (req, res) {
  const name = req.body.name;
  const text = req.body.text;
  const date = req.body.date;

  nameArr.push(name);
  textArr.push(text);
  dateArr.push(date);
  fs.writeFileSync("nameDB.json", JSON.stringify(nameArr));
  fs.writeFileSync("textDB.json", JSON.stringify(textArr));
  fs.writeFileSync("dateDB.json", JSON.stringify(dateArr));
  res.redirect("/");
});

app.post("/delete/:id", function (req, res) {
  const id = req.params.id;
  nameArr.splice(id, 1);
  textArr.splice(id, 1);
  dateArr.splice(id, 1);
  fs.writeFileSync("nameDB.json", JSON.stringify(nameArr));
  fs.writeFileSync("textDB.json", JSON.stringify(textArr));
  fs.writeFileSync("dateDB.json", JSON.stringify(dateArr));
  res.redirect("/");
});

const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
