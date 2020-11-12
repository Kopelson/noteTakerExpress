//require dependencies
const express = require("express");
const path =  require("path");
const fs = require("fs");
//allows app to start an express server
const app = express();
//sets a unique port for our server to listen too.
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// sets up the Express app to handle static files from assets
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
//api GET request
app.get("/api/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./assets/db/db.json"));
})
//api POST request
app.post("/api/notes", function(req, res) {
  //assigns the request body to newNote
  const newNote = req.body;
  //tutorial on appending json files https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
  //The main idea is to grab the db.json file  and read the data, then turn the data into an object with JSON.parse. 
  //Then add the new data by pushing the req.body to the object.table array and converts it back to json. 
  //Then write to the same file with the new note added to the table list of objects.
  fs.readFile(__dirname + "/assets/db/db.json", 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    //data is now an object
    obj = JSON.parse(data);
    //pushed the new note to the table array
    obj.table.push(newNote);
    //convert the object back to json
    json = JSON.stringify(obj);
    //writes the json to the same db.json file 
    fs.writeFile(__dirname + "/assets/db/db.json", json, 'utf8', (err) => {
      //throws an error if there is an error
      if (err) throw err;
      //logs to the server the file has been saved
      console.log('The file has been saved!');
    });
  }});
  //returns a json back to the client
  res.json(newNote);
});
//api DELETE request
app.delete('/api/notes/:note', function (req, res) {
  //assigns the request paramater note to note (this should be a unique id that was created with the note, it currently is the date the note was created)
  const note = req.params.note;
  //grabs the db.json file reads the data, turns the data into an object with JSON.parse, then filters the object table list witht he request param.
  //Then filter list is stored to a new object under table, then converts it back to json and the writes to the same file with the requested note deleted from the table list of objects. 
  fs.readFile(__dirname + "/assets/db/db.json", 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    //data is now an object  
    obj = JSON.parse(data);
    //filter out the note with the same id 
    let filteredObj = obj.table.filter(function(e){
      //returns a list of obejects doesn't match the requested note id
      return e.id !== note;
    });
    //create a new object to store the data in the table 
    let newObj = {"table": filteredObj}
    //convert the new object back to json
    json = JSON.stringify(newObj);
    //writes to the same db.json file with the updated json 
    fs.writeFile(__dirname + "/assets/db/db.json", json, 'utf8', (err) => {
      //throws an error if there is an error
      if (err) throw err;
      //logs to the server the file has been saved
      console.log('The file has been saved!');
    });
  }});
  //returns a json back to the client
  res.json(note);
});
//Express app listening on the assigned port
app.listen(PORT, function() {
  //logs to the server what port the app is listening on
  console.log("App listening on PORT: " + PORT);
});
