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

// Seperat Routes for Resource
const clientsRoutes = require("./routes/clients.js");

// Entry point
app.get("/", (req, res) => {
  res.render("welcome");
});

//Mount Routes
app.use("/clients", clientsRoutes());

// Begin Server
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
