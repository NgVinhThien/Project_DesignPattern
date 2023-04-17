import express from 'express';
import {getDanhMuc} from '../controller/danhmuc.js'
const router= express.Router();

router.get('/danhmuc', getDanhMuc);
// router.post('/add', addBook);


export default router;