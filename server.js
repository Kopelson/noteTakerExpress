//require dependencies
const express = require("express");
const path =  require("path");
//allows app to start an express server
const app = express();
//sets a unique port for our server to listen too.
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routing
//html routes
// index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});
// notes.html
app.get("/notes", function(res, res){
  res.sendFile(path.join(__dirname, "./assets/html/notes.html"));
});
// If no matching route is found default to index
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});
//our app begins listening on the assigned port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
