const express         = require("express");
const router          = express.Router();
const axios           = require('axios');

module.exports = () => {

   router.get("/info", (req, res) => {
     axios.get(`http://interview.mapsted.com/RnD/test-buildings.json`)
     .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


     res.render("clients")
   });
   return router;
}
