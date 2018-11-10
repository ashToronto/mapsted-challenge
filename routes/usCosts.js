const express = require("express");
const router = express.Router();
const axios = require('axios');

module.exports = () => {

let us_items_id = [];
let us_costs = [];

// Helper function Sum all costs from array
function add(a, b) {
    return a + b;
}

// Over here we will have to loop over both sets of api data.
// We will store American buiding_ids in an array
// and reference them against item_ids in the second api

// Total purchases for Samsung Manufacturers
  router.get("/info", (req, res) => {
    axios.get(`http://interview.mapsted.com/RnD/test-buildings.json`)
      .then(function(response) {
        // Loop through data object until purchase costs arrays - Tripple nested for loop approach
        for (i in response.data){
          if (response.data[i].country === "United States"){
            us_items_id.push(response.data[i].building_id)
        }
      }
        // console.log("us_items_id: ", us_items_id)
      })
      // Chain to our second api call
      .then(
        axios.get(`http://interview.mapsted.com/RnD/test-analytics.json`)
        .then(function(result){
          // console.log("RESULT ", result.data)
          for (d in us_items_id){
            for (i in result.data){
                for (j in result.data[i].usage_statistics.session_infos){
                  for (k in result.data[i].usage_statistics.session_infos[j].purchases){
                    if (result.data[i].usage_statistics.session_infos[j].purchases[k].item_id === us_items_id[d]){
                      us_costs.push(result.data[i].usage_statistics.session_infos[j].purchases[k].cost)
                  }
                  }
                }
            }
          }
          let american_purchases = us_costs.reduce(add, 0)
          american_purchases = Math.floor(american_purchases * 100) / 100
          const templateVars = {data: american_purchases}
          res.render("us_costs", templateVars)
          us_costs = [];
        })
      )
});
  return router;
}
