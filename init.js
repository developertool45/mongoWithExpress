const mongoose = require('mongoose');
const Chat = require('./models/chat.js');




main().then((res) => {
    console.log('Connection Successful');
})
    .catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

const allChats = [  
    {
        from: "Neha",
        to: "priya",
        message: "send me your exam sheet ",
        created_at : new Date()
    },
    {
        from: "Rajneesh",
        to: "Vishal",
        message: "apni padhai pe bhi dhyan de liya kr ",
        created_at : new Date()
    },
    {
        from: "Vishal",
        to: "Naresh",
        message: "gao m aa rha kya bhai ",
        created_at : new Date()
    },
    {
        from: "Naresh",
        to: "Aniket",
        message: "chat khane chlra kya ",
        created_at : new Date()
    },
    {
        from: "Aniket",
        to: "ApniGf",
        message: "mka chat khane chalri kya ",
        created_at : new Date()
    },
    {
        from: "sana",
        to: "naresh",
        message: "baby kaha ho aap ",
        created_at : new Date()
    },
    {
        from: "sana",
        to: "amit",
        message: "naresh ku kyu presan kr rhi ",
        created_at : new Date()
    },
    

]

Chat.insertMany(allChats);

