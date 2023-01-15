const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");
const { send } = require("process");

let dbArr = [];

const dbFile = fs.readFileSync("DB.json", "utf-8");
const dbData = JSON.parse(dbFile);

dbArr = [...dbData];

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home
app.get("/", function (req, res) {
  res.render("pages/index.ejs", { dbArr });
});

// create
app.post("/create", function (req, res) {
  const name = req.body.name;
  const text = req.body.text;
  const date = req.body.date;
  const pwd = req.body.pwd;

  dbArr.push({ 이름: name, 내용: text, 날짜: date, 비번: pwd });

  fs.writeFileSync("DB.json", JSON.stringify(dbArr));
  res.redirect("/");
});

// delete
app.post("/delete/:id", function (req, res) {
  const id = req.params.id;
  const pwdDelete = req.body.pwd_delete;
  if (pwdDelete == dbArr[id].비번) {
    dbArr.splice(id, 1);
    fs.writeFileSync("DB.json", JSON.stringify(dbArr));
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

  if (pwdUpdate == dbArr[upid].비번) {
    dbArr[upid].내용 = uptext;
    fs.writeFileSync("DB.json", JSON.stringify(dbArr));
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
