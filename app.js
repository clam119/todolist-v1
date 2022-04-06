const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const app = express();
let items = ["Hashnode blog", "Portfolio Items", "Portfolio Website"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {

    let today = new Date();
    let options = {
        weekday: 'long',
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("ja-JP", options);

    res.render('list', {
        typeOfDay: day,
        newListItems: items
    });

});

app.post('/', function (req, res) {

    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");

    });

app.listen(3000, function () {
    console.log("Successfully connected to port 3000.");
})