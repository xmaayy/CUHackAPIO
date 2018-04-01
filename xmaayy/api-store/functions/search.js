const MongoClient = require('mongodb').MongoClient;

let cache = null;

/**
* This is responsible for reading the mongoDB and returning all items in it for
* display on the results page
* 
*/
module.exports = (context, callback) => {
  let uri = process.env['MONGO_URI'];

  try {
    if (cache === null) {
      MongoClient.connect(uri, (error, db) => {
        if (error) {
          console.log(error['errors']);
          return callback(error);
        }
        cache = db;
        readTodos(db, callback);
      });
    } else {
      readTodos(cache, callback);
    }
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};

const readTodos = (db, callback) => {
  let cursor = db.collection('todo').find();
  let todos = [];
  cursor.each((error, item) => {
    if (error) {
      console.log(error);
    }
    if (item == null) {
      return callback(null, todos);
    }
    todos.push({
      id: item._id,
      text: item.text,
      completed: item.completed
    });
  });
};
