// There are only 5 entries in the ontario section of the building data.
// building_id and item_id are keys to each other
// So we refecence building_id as item_id the purchases array
// building ids for ontario are 7 to 13

const express = require("express");
const router = express.Router();
const axios = require('axios');
const helpers = require('./helpers');

module.exports = () => {

  let ontario_costs = [];

  // Total purchases for Samsung Manufacturers
  router.get("/info", (req, res) => {
    axios.get(`http://interview.mapsted.com/RnD/test-analytics.json`)
      .then(function(response) {
        // Loop through data object until purchase costs arrays - nested for loop approach
        for (i in response.data) {
          for (j in response.data[i].usage_statistics.session_infos) {
            const placeholder = response.data[i].usage_statistics.session_infos[j].building_id
            if (placeholder === 7 || placeholder === 8 || placeholder === 9 || placeholder === 10 || placeholder === 11 || placeholder === 12) {
              for (k in response.data[i].usage_statistics.session_infos[j].purchases) {
                ontario_costs.push(response.data[i].usage_statistics.session_infos[j].purchases[k].cost)
              }
            }
          }
        }

        // Sum all purchase costs
        let purchase_costs_ontario = ontario_costs.reduce(helpers.add, 0)
        purchase_costs_ontario = Math.floor(purchase_costs_ontario * 100) / 100
        //Render Total cost to EJS template
        const templateVars = {
          data: purchase_costs_ontario
        }
        console.log(purchase_costs_ontario)
        res.render("ontario_costs", templateVars)
        // Clear array cache incase user navigates and returns to this link
        ontario_costs = [];
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  return router;
}
