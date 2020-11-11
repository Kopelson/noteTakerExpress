//require express
const express = require("express");
//allows app to start an express server
const app = express();
//sets a unique port for our server to listen too.
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//our app begins listening on the assigned port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
