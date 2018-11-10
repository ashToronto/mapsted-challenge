// Over here we will have to loop over both sets of api data.
// We will store American buiding_ids in an array
// and reference them against item_ids in the second api

const express = require("express");
const router = express.Router();
const axios = require('axios');
const helpers = require('./helpers');

module.exports = () => {

  let us_items_id = [];
  let us_costs = [];

  // Total purchases for Samsung Manufacturers
  router.get("/info", (req, res) => {
    axios.get(`http://interview.mapsted.com/RnD/test-buildings.json`)
      .then(function(response) {
        // Loop through data object until purchase costs arrays - Tripple nested for loop approach
        for (i in response.data) {
          if (response.data[i].country === "United States") {
            us_items_id.push(response.data[i].building_id)
          }
        }
      })
      // Chain to our second api call
      .then(
        axios.get(`http://interview.mapsted.com/RnD/test-analytics.json`)
        .then(function(result) {
          for (d in us_items_id) {
            for (i in result.data) {
              for (j in result.data[i].usage_statistics.session_infos) {
                const placeholder = result.data[i].usage_statistics.session_infos[j]
                if (placeholder.building_id === us_items_id[d]) {
                  for (k in placeholder.purchases) {
                    us_costs.push(placeholder.purchases[k].cost)
                  }
                }
              }
            }
          }
          let american_purchases = us_costs.reduce(helpers.add, 0)
          american_purchases = Math.floor(american_purchases * 100) / 100
          const templateVars = {
            data: american_purchases
          }
          res.render("us_costs", templateVars)
          // Clear array cache incase user navigates and returns to this link
          us_costs = [];
        })
      )
  });
  return router;
}
