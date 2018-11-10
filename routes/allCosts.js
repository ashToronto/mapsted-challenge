const express = require("express");
const router = express.Router();
const axios = require('axios');

module.exports = () => {

let index_id = [];
let item_total_cost = [];


// Helper function Sum all costs from array
function add(a, b) {
    return a + b;
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex+1;
}

// Again, we make 2 api calls
// Looping over all data from building api and saving each building_id in an array
// Loop over analytics api and match key value with item_id
// save purchase.cost into temporary array and sum
// save summed value to summary array
// find index of greatest value in summary array

// Total purchases for Samsung Manufacturers
  router.get("/info", (req, res) => {
    axios.get(`http://interview.mapsted.com/RnD/test-buildings.json`)
      .then(function(response) {
        // Loop through data object until purchase costs arrays - Tripple nested for loop approach
        for (i in response.data){
        index_id.push(response.data[i].building_id)
      }
        // console.log("us_items_id: ", us_items_id)
      })
      // Chain to our second api call
      .then(
        axios.get(`http://interview.mapsted.com/RnD/test-analytics.json`)
        .then(function(result){
          // console.log("RESULT ", result.data)
          for (d in index_id){
            let temporary = [];
            for (i in result.data){
                for (j in result.data[i].usage_statistics.session_infos){
                  const placeholder = result.data[i].usage_statistics.session_infos[j]
                  if (placeholder.building_id === index_id[d]){
                    for (k in placeholder.purchases){
                      temporary.push(placeholder.purchases[k].cost)
                    }
                  }
                }
            }
            let total = temporary.reduce(add, 0)
            item_total_cost.push(total)
            temporary = []
          }
          console.log("TOTAL: ", item_total_cost)
          const greatest_cost = indexOfMax(item_total_cost)
          const templateVars = {data: greatest_cost}
          // Math.max.apply(Math,item_total_cost)
          console.log("Q5 ANSWER : " + greatest_cost)
          res.render("all_costs", templateVars)
          item_total_cost = [];
        })
      )
});
  return router;
}
