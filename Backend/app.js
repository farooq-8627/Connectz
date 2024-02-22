const express = require("express");
const app = express();
const port = 3000;
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");

app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res, next) => {
	res.render("communities/index.ejs");
});

app.listen(port, () => {
	console.log(`server is listening on port : ${port}`);
});
