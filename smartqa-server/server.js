require ('dotenv').config();
const express= require('express');
const cors = require('cors');

const app=express();


//middlewares
app.use(express.json());

const corsConfig={
    origin:process.env.CLIENT_URL,
    credentials:true
};

app.use(cors(corsConfig));

//start server
const Port=process.env.PORT;

app.listen(Port,(error)=>{
    if(error){
        console.log("Error is there.Server not starting due to ",error);
    }
    else{
        console.log("Server started at port:",Port);
    }
});
