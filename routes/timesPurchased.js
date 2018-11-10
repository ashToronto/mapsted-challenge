const express = require("express");
const router = express.Router();
const axios = require('axios');

module.exports = () => {

  let item_ids = [];

  // Total number of times item (item_id = 47) was purchased
  router.get("/info", (req, res) => {
    axios.get(`http://interview.mapsted.com/RnD/test-analytics.json`)
      .then(function(response) {
        // Loop through data object until purchase costs arrays - nested for loop approach
        for (i in response.data) {
          for (j in response.data[i].usage_statistics.session_infos) {
            for (k in response.data[i].usage_statistics.session_infos[j].purchases) {
              if (response.data[i].usage_statistics.session_infos[j].purchases[k].item_id === 47) {
                item_ids.push(response.data[i].usage_statistics.session_infos[j].purchases[k].item_id)
              }
            }
          }
        }

        let itemID_frequency = item_ids.length
        const templateVars = {
          data: itemID_frequency
        }
        console.log("PURCHASED USED TIMES", itemID_frequency, "item list:" + item_ids)
        res.render("times_purchased", templateVars)
        // Clear array cache incase user navigates and returns to this link
        item_ids = [];
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  return router;
}
