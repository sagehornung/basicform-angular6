var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var PERSON = "person";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/basicform";
app.use(express.static(distDir));

var PERSON = "person";

var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://sage:hornung1@ds221292.mlab.com:21292/sageinterview', function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// app.get("/api/person/:search", function(req, res) {
//   var search = req.params.search;
//   console.log('Search query string', search);
//   db.collection(PERSON).find({}).toArray(function(err, docs) {
//     if (err) {
//       handleError(res, err.message, "Failed to get contacts.");
//     } else {
//       console.log(docs);
//       res.status(200).json(docs);
//     }
//   });
// });

app.get("/api/person", function(req, res) {

  var search = req.params.search;
  console.log('Search query string', search);
  db.collection(PERSON).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      console.log(docs);
      res.status(200).json(docs);
    }
  });
});




app.post("/api/person", function(req, res) {
  console.log('POST PERSON', req);
  var newContact = req.body;
  console.log(newContact);
  newContact.createDate = new Date();

  if (false) {
  //if (!req.body.name) {
    handleError(res, "Invalid person input", "Must provide a name.", 400);
  } else {
    db.collection(PERSON).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new person.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }


});


app.post("/api/search", function(req, res) {
  console.log('POST PERSON', req.body);
  var param = req.body.search;
  console.log('Search query', param);

  if (false) {
    //if (!req.body.name) {
    handleError(res, "Invalid person input", "Must provide a name.", 400);
  } else {
    db.collection(PERSON).find({ $text: { $search: param } } ).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        console.log(docs);
        res.status(200).json(docs);
      }
    });
  }


});

// app.post("/api/search", function(req, res) {
//   console.log('POST PERSON', req);
//   var search = req.body.toString();
//   console.log('Search query', search);
//
//   if (false) {
//     //if (!req.body.name) {
//     handleError(res, "Invalid person input", "Must provide a name.", 400);
//   } else {
//     db.collection(PERSON).schema.index({"first": search, "last": search, "phone": search, "email": search, "address": search}  ).toArray(function(err, docs) {
//       if (err) {
//         handleError(res, err.message, "Failed to get contacts.");
//       } else {
//         console.log(docs);
//         res.status(200).json(docs);
//       }
//     });
//   }
//
//
// });

app.put("/api/person", function(req, res) {
  console.log('POST PERSON', req);
  var newContact = req.body;
  console.log(newContact);
  newContact.createDate = new Date();

  if (false) {
    //if (!req.body.name) {
    handleError(res, "Invalid person input", "Must provide a name.", 400);
  } else {
    db.collection(PERSON).update({"_id": ObjectID(newContact._id)}, {$set:{ "first": newContact.first, "last": newContact.last, "phone": newContact.phone, "address": newContact.address, "email": newContact.email,} }, function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        console.log(docs);
        res.status(200).json(docs);
      }
    });
  }


});
