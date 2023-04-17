import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import posts from './router/posts.js'

const app= express();
const PORT= process.env.port || 5000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/post', posts);

app.listen( PORT, ()=>{
    console.log("Running server...")
});