import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import xe from './router/xe.js'
import danhmuc from './router/danhmuc.js'
import hangxe from './router/hangxe.js'
import _AuthMiddleWare from './common/_AuthMiddleWare.js';
import user from './router/user.js';
import hoa_don from './router/hoa_don.js';


const app= express();
const PORT= process.env.port || 5000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

app.use('/', hangxe);
app.use('/', danhmuc);
app.use('/', xe);
app.use('/', user);
app.use(_AuthMiddleWare.isAuth);
app.use('/', hoa_don);

app.listen( PORT, ()=>{
    console.log("Running server...")
});
