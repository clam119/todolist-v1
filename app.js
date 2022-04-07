const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const date = require(__dirname + "/date.js");
const app = express();
const items = ["ハスノードへのブログを作成すること", "自作のプロジェクトを作成すること", "ポートフォリオサイトを作成すること"];
const workItems = [];
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', function (req, res) {

    let day = date.getDate();

    res.render('list', {
        listTitle: day,
        newListItems: items
    });

});

app.post('/', function (req, res) {

    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
})

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(process.env.PORT || port, function () { //As this is hosted on Heroku, process.env.PORT will just adapt to the port assigned by Heroku, and also listens to localhost port 3000.
    console.log("Successfully connected to port: 3000.");
})
