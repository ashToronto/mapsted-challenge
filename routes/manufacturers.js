const express = require("express");
const router = express.Router();
const axios = require('axios');
const helpers = require('./helpers');

module.exports = () => {

  let session_purchases = [];

  // Total purchases for Samsung Manufacturers
  router.get("/info", (req, res) => {
    axios.get(`http://interview.mapsted.com/RnD/test-analytics.json`)
      .then(function(response) {
        // Loop through data object until purchase costs arrays - nested for loop approach
        for (i in response.data) {
          if (response.data[i].manufacturer = "Samsung") {
            for (j in response.data[i].usage_statistics.session_infos) {
              for (k in response.data[i].usage_statistics.session_infos[j].purchases) {
                session_purchases.push(response.data[i].usage_statistics.session_infos[j].purchases[k].cost)
              }
            }
          }
        }
        // Sum all purchase costs
        let total = session_purchases.reduce(helpers.add, 0)
        total = Math.floor(total * 100) / 100
        //Render Total cost to EJS template
        const templateVars = {
          data: total
        }
        console.log(templateVars)
        res.render("manufacturer", templateVars)
        // Clear array cache incase user navigates and returns to this link
        session_purchases = [];
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  return router;
}
