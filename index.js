const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require('./models/chat.js');
const exp = require('constants');
const methodOverride = require("method-override");
const ExpressError = require('./ExpressError.js');


app.use(methodOverride("_method")) 
app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'ejs');

app.use(express.urlencoded({extended : true}))

main().then((res) => {
    console.log('Connection Successful');
})
    .catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/newfakewhatsapp')
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
app.get("/chats/new", (req, res) => {
    throw new ExpressError(404, "page not found");
    res.render("new.ejs")
});

//create route
app.post("/chats", (req, res) =>{
    let { from, to, message } = req.body; 
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at : new Date()
    })
    newChat.save().then((res) => {
        console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/chats")
}) 

//edit route 
app.get("/chats/:id/edit", async(req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat})
})
//Show route 
app.get("/chats/:id", async(req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        throw new ExpressError(404, "chat not found");
    }
    res.render("edit.ejs", {chat})
})

//update route

// app.put("/chats/:id", async(req, res) => {
//     let { id } = req.params;
//     let { newMsg } = req.body;
//     let updateChat = await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
//     console.log(updateChat);
//     // res.redirect("/chats")
// })
app.put("/chats/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let { message : newMsg} = req.body;           
        if (!id) {
            throw new Error("ID parameter is missing");
        }
        if (!newMsg) {
            throw new Error("newMsg parameter is missing");
        }
        let updateChat = await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
        if (!updateChat) {
            throw new Error(`No chat found with ID: ${id}`);
        }
        console.log(updateChat);
        res.redirect("/chats");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});
 
// delete chat route

app.delete("/chats/:id",  async(req, res) => {
   let { id } = req.params;
    let chatDelete = await Chat.findByIdAndDelete(id );
    console.log(chatDelete);
    res.redirect("/chats")

})

app.use((err, req, res, next) => {
    let { status = "500", message = "SOME ERROR OCCURED" } = err;
    res.status(status).send(message);
})

app.listen(8080, (req, res) => {
    console.log("server listening on 8080");
})

