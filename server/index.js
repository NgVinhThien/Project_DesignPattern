import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import web from './router/web.js'
// require('dotenv').config();

const app= express();
const PORT= process.env.port || 5000;

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());


configViewEngine(app);
app.use('/', web);

app.listen( PORT, ()=>{
    console.log("Running server...")
});
