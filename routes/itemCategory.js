const express = require("express");
const router = express.Router();
const axios = require('axios');
const helpers = require('./helpers');

module.exports = () => {

  let item_category = [];

  // Total number of times item (item_id = 47) was purchased
  router.get("/info", (req, res) => {
    axios.get(`http://interview.mapsted.com/RnD/test-analytics.json`)
      .then(function(response) {
        // Loop through data object until purchase costs arrays - nested for loop approach
        for (i in response.data) {
          for (j in response.data[i].usage_statistics.session_infos) {
            for (k in response.data[i].usage_statistics.session_infos[j].purchases) {
              if (response.data[i].usage_statistics.session_infos[j].purchases[k].item_category_id === 7) {
                item_category.push(response.data[i].usage_statistics.session_infos[j].purchases[k].cost)
              }
            }
          }
        }

        let category_frequency = item_category.reduce(helpers.add, 0)
        category_frequency = Math.floor(category_frequency * 100) / 100
        const templateVars = {
          data: category_frequency
        }
        console.log("ITEM CATEGORY TIMES PURCHASED", category_frequency)
        res.render("item_category", templateVars)
        // Clear array cache incase user navigates and returns to this link
        item_category = [];
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  return router;
}
