/**
* The api Search function for **project name**
* @param {string} api_type api_type is what is passed in the search box to search for different api's
* @param {any} data
* @returns {object}
*/

const cont = require("./mongo_controller")

const fetch = require('./create')

module.exports = (api_type = "undef", data = "undef_data", context, callback) => {
  
  if (api_type == "search") cont(data,context,callback)
  else callback(null, `Parameters Dont Make Sense`);

};
