const express = require("express");
const cors = require("cors");
const mongoose = require ("mongoose");
const socket = require("socket.io")

const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/messages",messagesRoute)


//Connexions base de données 
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology :true
}).then(()=>{
    console.log("DB Connection Successfull");
}).catch((err) => {
    console.log(err.message);
});



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
})

const io = socket(server,{
    cors: {
        // Si je veux plusieurs url je peux mettre un tableaux [], sinon je peux mettre "*" pour que ce soit la fete.
        origin: "https://react-chat-app-pink-ten.vercel.app/",
        Credentials: true
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        // console.log("send-msg", {data});
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
})