const MongoClient = require('mongodb').MongoClient;

/**
* A basic Hello World function
* @param {string} name Who you're saying hello to
* @returns {any}
*/
module.exports = (name = 'world', context, callback) => {
    let uri = process.env['MONGO_URI'];

  if (name == "create") {
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;

      console.log("Reassign DB var")
      var SpecDB = db.db("api-backend");
      console.log("Attempting to create collection")
      SpecDB.createCollection("api-listings", function(err,res){
        if (err) throw err;
        console.log("Collection Created")
        db.close();
      })

      callback(null,'DB Connected Successfully')
    });
  }

};
