//require dependencies
const express = require("express");
const path =  require("path");
const fs = require("fs");
const { stringify } = require("querystring");
//allows app to start an express server
const app = express();
//sets a unique port for our server to listen too.
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/assets'));
//routing
//html routes
// index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./assets/html/index.html"));
});
// notes.html
app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./assets/html/notes.html"));
});
//api GET requests
app.get("/api/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./assets/db/db.json"));
})

//api POST requests
app.post("/api/notes", function(req, res) {
  const newNote = req.body;
  //tutorial on appending json files https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
  fs.readFile(__dirname + "/assets/db/db.json", 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.table.push(newNote); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile(__dirname + "/assets/db/db.json", json, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }); // write it back 
}});

  res.json(newNote);
});

app.delete('/api/notes/:note', function (req, res) {
  const note = req.params.note;
  fs.readFile(__dirname + "/assets/db/db.json", 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    let filteredObj = obj.table.filter(function(e){
      return e.id !== note;
    }); //filter out the note with the same id
    let newObj = {"table": filteredObj}//create a new object to store the data in the table
    json = JSON.stringify(newObj); //convert it back to json
    fs.writeFile(__dirname + "/assets/db/db.json", json, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }); // write it back 
  }});
  res.json(note);
});


//our app begins listening on the assigned port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
