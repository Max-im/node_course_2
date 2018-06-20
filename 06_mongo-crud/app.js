const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if(err) return console.log("connection err");
  console.log("Connected successfully to server");

  const db = client.db('test');
  const collection = db.collection('crud');
  
  
  // CREATE
  collection.insertOne(
    {text: "text example3", success: true},
    (err, result) => {
        if(err) return console.log("insert err");
        console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );
  
  
  
  // DELETE
  // delete many
  collection.deleteMany({})
    .then(result => console.log(result));
    
  // delete one
  collection.deleteOne({text: "text example"})
    .then(result => console.log(result));
  
  // find one and delete
  collection.findOneAndDelete({text: "text example3"})
    .then(result => console.log(result));
  
  
  
  // UPDATE
  collection.findOneAndUpdate(
      {_id: new ObjectID("5b16396d65c8300d1a917d52")},
      {$set: {success: false}},
      {returnOriginal: false}
  ).then(result => console.log(result))
  
  
  
  client.close();
});