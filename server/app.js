const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 4000;
const app = express();
require("dotenv/config")

const cors = require("cors");
const {default : mongoose} = require("mongoose");

app.use(cors ({origin : true}));
app.use(express.json());


app.get("/" , (req , res)=> {
    return res.json("hello i am here..............")
})


//user Authentication route 

const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// songs routes

const songsRoute = require("./routes/songs")
app.use("/api/songs/" , songsRoute);

//Artists route 

const artistRoute = require("./routes/artists");
app.use("/api/artist/" , artistRoute);


//album route 
const albumRoute = require("./routes/album");
const { dirname } = require("path");
app.use("/api/album/" , albumRoute); 


mongoose.connect(process.env.DB_STRING ,{useNewUrlParser : true});
mongoose.connection
.once("open",()=> console.log("connected"))
.on("error" , (error)=> {console.log(`ERROR : ${error}`);
})


app.use(express.static(path.join(__dirname , '../client/build')));

app.get('*' , function(req,res){
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
})

app.listen(PORT , ()=> console.log("Listening to the port number 4000"));