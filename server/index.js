import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import danhmuc from './router/danhmuc.js'

const app= express();
const PORT= process.env.port || 5000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', danhmuc);

app.listen( PORT, ()=>{
    console.log("Running server...")
});