require("./server/config/config");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(cors({ origin: "http://localhost:4200" }));
app.options("*", cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/scrape", require("./server/routes/scrape"));
//app.use('/api/scrape',require ('./controllers/controllers'))

// app.use(require ('./scrapeold'))
app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//app.use(function(req, res, next) {
// res.header("Access-Control-Allow-Origin",'*');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
// });

mongoose.connect(
  "mongodb://cagonacona:romimu1111@ds035856.mlab.com:35856/santacruz",
  { useNewUrlParser: true },

  (err, res) => {
    if (err) throw err;

    console.log("Conectado al servidor de la base de datos 27017");
  }
);

app.listen(process.env.PORT, () => {
  console.log("escuchando en el puerto 3000");
});