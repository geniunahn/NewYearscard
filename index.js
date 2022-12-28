const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");
const { send } = require("process");

let nameArr = [];
let textArr = [];
let dateArr = [];
let pwdArr = [];

const nameFile = fs.readFileSync("nameDB.json", "utf-8");
const textFile = fs.readFileSync("textDB.json", "utf-8");
const dateFile = fs.readFileSync("dateDB.json", "utf-8");
const pwdFile = fs.readFileSync("pwdDB.json", "utf-8");

const nameData = JSON.parse(nameFile);
const textData = JSON.parse(textFile);
const dateData = JSON.parse(dateFile);
const pwdData = JSON.parse(pwdFile);

nameArr = [...nameData];
textArr = [...textData];
dateArr = [...dateData];
pwdArr = [...pwdData];

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
  const pwd = req.body.pwd;

  nameArr.push(name);
  textArr.push(text);
  dateArr.push(date);
  pwdArr.push(pwd);
  fs.writeFileSync("nameDB.json", JSON.stringify(nameArr));
  fs.writeFileSync("textDB.json", JSON.stringify(textArr));
  fs.writeFileSync("dateDB.json", JSON.stringify(dateArr));
  fs.writeFileSync("pwdDB.json", JSON.stringify(pwdArr));
  res.redirect("/");
});

// delete
app.post("/delete/:id", function (req, res) {
  const id = req.params.id;
  const pwdDelete = req.body.pwd_delete;
  if (pwdDelete == pwdArr[id]) {
    nameArr.splice(id, 1);
    textArr.splice(id, 1);
    dateArr.splice(id, 1);
    pwdArr.splice(id, 1);
    fs.writeFileSync("nameDB.json", JSON.stringify(nameArr));
    fs.writeFileSync("textDB.json", JSON.stringify(textArr));
    fs.writeFileSync("dateDB.json", JSON.stringify(dateArr));
    fs.writeFileSync("pwdDB.json", JSON.stringify(pwdArr));
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

// update
app.post("/update/:id", function (req, res) {
  const upid = req.params.id;
  const pwdUpdate = req.body.pwd_update;
  const uptext = req.body.textUpdate;

  if (pwdUpdate == pwdArr[upid]) {
    textArr.splice(upid, 1, uptext);
    fs.writeFileSync("textDB.json", JSON.stringify(textArr));
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
