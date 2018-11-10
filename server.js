const express         = require("express");
const PORT            = 3000;
const bodyParser      = require("body-parser");
const app             = express();

// parse application json data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// EJS Modules
app.set("view engine", "ejs");

// Serve CSS files to ejs views
app.use(express.static(__dirname + '/stylesheets'));

// Seperate Routes for Resources
const samsung_Route = require("./routes/manufacturers.js");
const times_Purchased = require("./routes/timesPurchased.js");
const item_category = require("./routes/itemCategory.js");
const ontario_costs = require("./routes/ontarioCosts.js");
const us_costs = require("./routes/usCosts.js");

// Entry point
app.get("/", (req, res) => {
  res.render("welcome");
});

//Mount Routes
app.use("/manufacturers", samsung_Route());
app.use("/timesPurchased", times_Purchased());
app.use("/itemCategory", item_category());
app.use("/ontarioCosts", ontario_costs());
app.use("/usCosts", us_costs());

// Begin Server
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
