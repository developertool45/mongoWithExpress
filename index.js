const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require('./models/chat.js');
const { log } = require('console');

app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'ejs');

main().then((res) => {
    console.log('Connection Successful');
})
    .catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}


app.get("/", (req, res) => {
    console.log("Working");
    res.send(" working");
})
app.get("/chats", async(req, res) => {
    let chats = await Chat.find();
    console.log(chats);
   res.render("index.ejs", {chats})
})


//new route
app.get("/chats/new", async(req, res) => {
    let chats = await Chat.find();
    console.log(chats);
   res.render("index.ejs", {chats})
})

app.listen(8080, (req, res) => {
    console.log("server listening on 8080");
})