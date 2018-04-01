const MongoClient = require('mongodb').MongoClient;

/**
* The controller for all MONGO Operations, do not tell it to drop a table if you dont want that table dropped
*TODO: Add backup feature
* @param {string} params The mongo command string given to this API by the user
* @returns {any}
*/

module.exports = (params, context, callback) => {
  if (!params) throw Error("Need to pass this in")
  let uri = process.env['MONGO_URI'];
  param = params.split('|')
  console.log(param)


  if (param[0] == "collection" && param[1] == "create") {
    if (param.length < 3) throw Error("Incorrect Arguments for Insert Operation")
    MongoClient.connect(uri, (err, db) => {
      if (err) throw err;
      var SpecDB = db.db("api-backend");
      SpecDB.createCollection(param[2], (err,res) => {
        if (err) throw err;
        db.close();
        callback(null,1)
      })
    });

  } else if (param[0] == "collection" && param[1] == "drop"){
    if (param.length < 3) throw Error("Incorrect Arguments for Insert Operation")
    MongoClient.connect(uri, (err, db) => {
      if (err) throw err;
      var SpecDB = db.db("api-backend");
      SpecDB.collection(param[2]).drop((err,res) => {
        if (err) throw err;
        db.close();
        callback(null,1)
      })
    });
  
  } else if (param[0] == "insert") {
    if (param.length < 7) throw Error("Incorrect Arguments for Insert Operation")
    MongoClient.connect(uri, (err, db) => {
      if (err) throw err;
      var myobj = 
      {
        Name: param[2],
        Description: param[3],
        PPC: param[4],
        imgUrl: param[5],
        exampleCall: param[6]
      };
      var SpecDB = db.db("api-backend");
      SpecDB.collection(param[1]).insertOne(myobj, (err, res) => {
        if (err) throw err;
        db.close();
      }); // End of insert
    });//End of mongo connection
    callback(null, 1)

  } else if (param[0] == "findall") {
    MongoClient.connect(uri, (err, db) => {
      if (err) throw err;
      var SpecDB = db.db("api-backend");
      SpecDB.collection(param[1]).find({}).toArray((err, result) => {
        console.log(result)
        if (err) throw err;
        callback(null, result)
        db.close();
      });
    });   
  } else callback(null,-1)// End of if

};
