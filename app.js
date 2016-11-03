/*
* Set up node server
*/
const http = require('http');

const hostname = '127.0.0.1';
const port = '3000';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});



/*
* Connecting to MongoDB
// */
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// connection URL
var url = 'mongodb://localhost:27017/floatingdoctors';

// use connect method to connect to the server
MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    insertDocuments(db, function(){
        findDocuments(db, function(){
            db.close();
        });
    });
    // db.close();
});

// Test insert method
var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a: 1}, {a: 2}, {a: 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

var findDocuments = function(db, callback) {
    var collection = db.collection('documents');
    collection.find({}).toArray(function(err, docs){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

