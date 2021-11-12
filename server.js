////////////////////////////
// Dependencies
////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose') // This can be changed to './database/connection' if you make a connection.js file
const cors = require('cors')
const { application } = require('express')
const app = express()
const {PORT = 3000} = process.env


/////////////////////////////////
// Database Connection
////////////////////////////////
// establish connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// Connection Events
mongoose.connection
.on("open", () => console.log("You are connected to Mongo"))
.on("close", () => console.log("You are disconnected from Mongo"))
.on("error", (error) => console.log(error))


//////////////////////////////
// Models
//////////////////////////////


const BookmarkSchema = new mongoose.Schema({
    title: String,
    url: String 
}, )

const Bookmark = mongoose.model("Bookmark", BookmarkSchema)



///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies




// Routes



app.get("/", (req, res) => {
    res.send("Hello World")
})

//  INDEX ROUTE
app.get("/bookmarks", async (req, res) => {
    try {
      res.json(await Bookmark.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });


// CREATE ROUTE 
app.post("/bookmarks", async (req, res) => {
    try {
      res.json(await Bookmark.create(req.body));
    } catch (error) {
      res.status(400).json({ error });
    }
  });


  // UPDTAE ROUTE 
app.put("/bookmarks/:id", async (req, res) => {
    try {
       
        res.json(await Bookmark.findByIdAndUpdate(req.params.id, req.body, {new: true}));
      } catch (error) {
        res.status(400).json({ error });
      }
})


// DELETE ROUTE 
app.delete("/bookmarks/:id", async (req, res) => {
    try {
   
      res.json(await Bookmark.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });


/////////////////////////////////
// Server Listener
/////////////////////////////////
app.listen(PORT, () => {console.log(`listening on PORT ${PORT}`)})